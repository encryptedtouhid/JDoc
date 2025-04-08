<!-- App.vue -->
<template>
  <div id="app">
    <DocEditor />
  </div>
</template>

<script setup>
import DocEditor from './components/DocEditor.vue'
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  height: 98vh;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Global styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>