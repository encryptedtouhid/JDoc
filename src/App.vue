<template>
  <div class="app-container">
    <Toolbar
        :docTitle="docTitle"
        @update:docTitle="updateTitle"
        @save-document="triggerSave"
    />

    <!-- Save Filename Popup -->
    <div v-if="showFilenameInput" class="filename-prompt">
      <input
          v-model="filename"
          @keyup.enter="confirmSave"
          class="filename-input"
          placeholder="Enter filename (e.g. notes.txt)"
          autofocus
      />
      <button class="button primary" @click="confirmSave">Save</button>
    </div>

    <Editor
        :code="code"
        @update:code="updateCode"
        ref="editorComponent"
    />
    <StatusBar :characterCount="characterCount" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import Toolbar from './components/Toolbar.vue';
import Editor from './components/Editor.vue';
import StatusBar from './components/StatusBar.vue';

// Default values
const DEFAULT_TITLE = 'Coding Interview Practice Document';
const DEFAULT_CODE = `/**
 * Sample code for Google coding interview
 */
function solution() {
    // Your code here
}`;

// State refs
const docTitle = ref(DEFAULT_TITLE);
const code = ref('');
const editorComponent = ref(null);

const characterCount = computed(() => code.value.length);

// 🔽 Save Dialog States
const showFilenameInput = ref(false);
const filename = ref('document.txt');

const triggerSave = () => {
  showFilenameInput.value = true;
};

const confirmSave = () => {
  if (!filename.value.trim()) return;

  const blob = new Blob([code.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.value.trim();
  link.click();
  URL.revokeObjectURL(link.href);

  showFilenameInput.value = false;
};

// 🔽 Title and Code Update
const updateTitle = (newTitle) => {
  docTitle.value = newTitle;
  saveToLocalStorage();
};

const updateCode = (newCode) => {
  code.value = newCode;
  saveToLocalStorage();
};

// 🔽 Local Storage Save/Load
const saveToLocalStorage = () => {
  const documentState = {
    title: docTitle.value,
    code: code.value,
    lastModified: new Date().toISOString()
  };
  localStorage.setItem('jdoc-document-state', JSON.stringify(documentState));
};

const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('jdoc-document-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      docTitle.value = parsedState.title || DEFAULT_TITLE;
      code.value = parsedState.code || DEFAULT_CODE;
      console.log('Restored document from previous session');
      return true;
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return false;
};

onMounted(() => {
  const loaded = loadFromLocalStorage();
  if (!loaded) code.value = DEFAULT_CODE;

  // Save on page unload
  window.addEventListener('beforeunload', () => saveToLocalStorage());

  const autoSaveInterval = setInterval(saveToLocalStorage, 30000);

  onUnmounted(() => {
    clearInterval(autoSaveInterval);
    window.removeEventListener('beforeunload', saveToLocalStorage);
  });
});
</script>

<style scoped>
.filename-prompt {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  border-radius: 8px;
  display: flex;
  gap: 12px;
  z-index: 1000;
  align-items: center;
}

.filename-input {
  font-size: 16px;
  padding: 8px 12px;
  border: 1px solid var(--google-gray-300);
  border-radius: 4px;
  min-width: 240px;
}
</style>
