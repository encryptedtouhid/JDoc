<template>
    <div class="toolbar">
      <div class="toolbar-section-left">
        <div class="logo"></div>
        <div class="doc-title-container">
          <input class="doc-title" :value="docTitle" @input="$emit('update:title', $event.target.value)" placeholder="Untitled document" />
          <div class="doc-path">Coding Interview > {{ docTitle }}</div>
        </div>
      </div>
      <div class="toolbar-section-right">
        <div class="icon-button" title="Comments">
          <!-- SVG -->
        </div>
        <div class="icon-button" title="Share">
          <!-- SVG -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['docTitle'])
  defineEmits(['update:title'])
  </script>
  
  <style scoped>
  /* Paste only toolbar-related styles from your main file */
  </style>
  