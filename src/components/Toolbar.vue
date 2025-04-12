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
      <!-- Replace the Comments button in Toolbar.vue -->

      <div class="icon-button save-button" @click="$emit('save-document')" title="Save Document">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
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