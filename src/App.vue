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
import { ref, computed, onMounted } from 'vue';
import Toolbar from './components/Toolbar.vue';
import Editor from './components/Editor.vue';
import StatusBar from './components/StatusBar.vue';

const docTitle = ref('Coding Interview Practice Document');
const code = ref('');
const editorComponent = ref(null);

const characterCount = computed(() => {
  return code.value.length;
});

const updateTitle = (newTitle) => {
  docTitle.value = newTitle;
};

const updateCode = (newCode) => {
  code.value = newCode;
};

// Example starting code template
const codeTemplate = `/**
 * Sample code for Google coding interview
 */
function solution() {
    // Your code here
    
}`;

onMounted(() => {
  // Initialize with the template
  code.value = codeTemplate;
});
</script>