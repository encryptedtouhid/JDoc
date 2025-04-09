<template>
  <div class="app-container">
    <Toolbar :docTitle="docTitle" @update:docTitle="updateTitle" />
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

const characterCount = computed(() => {
  return code.value.length;
});

const updateTitle = (newTitle) => {
  docTitle.value = newTitle;
  // Save to localStorage whenever the title changes
  saveToLocalStorage();
};

const updateCode = (newCode) => {
  code.value = newCode;
  // Save to localStorage whenever the code changes
  saveToLocalStorage();
};

// Local storage functions
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
  // Try to load from localStorage first
  const loaded = loadFromLocalStorage();
  
  // If nothing was loaded, initialize with the template
  if (!loaded) {
    code.value = DEFAULT_CODE;
  }
  
  // Set up beforeunload handler to save before the page is closed
  window.addEventListener('beforeunload', () => {
    saveToLocalStorage();
  });
  
  // Also save periodically (every 30 seconds)
  const autoSaveInterval = setInterval(() => {
    saveToLocalStorage();
  }, 30000);
  
  // Clean up when component is unmounted
  onUnmounted(() => {
    clearInterval(autoSaveInterval);
    window.removeEventListener('beforeunload', saveToLocalStorage);
  });
});
</script>