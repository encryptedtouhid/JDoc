<template>
  <div class="editor-container">
    <div class="editor-paper">
      <div 
        class="editor" 
        contenteditable="true" 
        @input="updateCode" 
        ref="codeEditor"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  code: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:code']);
const codeEditor = ref(null);

const updateCode = (event) => {
  emit('update:code', event.target.innerText);
};

const highlightCode = () => {
  if (!props.code || !codeEditor.value) {
    return;
  }
  
  const highlighted = window.hljs.highlight(props.code, {
    language: 'javascript'
  }).value;
  
  // Storing this for potential future use if we want to show highlighted code
  return highlighted;
};

// Watch for changes in code prop to update the editor content
watch(() => props.code, (newCode) => {
  if (codeEditor.value && newCode !== codeEditor.value.innerText) {
    codeEditor.value.innerText = newCode;
  }
}, { immediate: true });

onMounted(() => {
  if (codeEditor.value) {
    codeEditor.value.innerText = props.code;
  }
});

// Expose methods to parent component
defineExpose({
  highlightCode
});
</script>