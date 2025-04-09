<template>
  <div class="toolbar">
    <div class="toolbar-section-left">
      <div class="logo"></div>
      <div class="doc-title-container">
        <input 
          class="doc-title" 
          :value="docTitle" 
          @input="updateTitle" 
          @blur="onTitleBlur"
          @focus="onTitleFocus"
          placeholder="Untitled document"
        >
        <div class="doc-path">Coding Interview > {{ docTitle }}</div>
      </div>
    </div>
    <div class="toolbar-section-right">
      <div class="icon-button" title="Comments">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.99 4C21.99 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22L21.99 4ZM18 14H6V12H18V14ZM18 11H6V9H18V11ZM18 8H6V6H18V8Z" fill="#5F6368"/>
        </svg>
      </div>
      <div class="icon-button" title="Share">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#5F6368"/>
        </svg>
      </div>
      <!-- Submit button commented out for now -->
      <!-- <button class="button primary">
        Submit
      </button> -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  docTitle: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:docTitle']);

const updateTitle = (event) => {
  emit('update:docTitle', event.target.value);
};

const onTitleFocus = (event) => {
  // Add a CSS class to indicate the title is being edited
  event.target.classList.add('editing');
};

const onTitleBlur = (event) => {
  // Remove the editing class
  event.target.classList.remove('editing');
  
  // If title is empty, reset to a default
  if (!event.target.value.trim()) {
    emit('update:docTitle', 'Untitled document');
  }
};
</script>