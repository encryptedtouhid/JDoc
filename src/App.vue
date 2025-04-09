<template>
  <div id="app">
    <Toolbar :docTitle="docTitle" @update:title="docTitle = $event" />
    <DocEditor @update:charCount="charCount = $event" />
    <StatusBar :count="charCount" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Toolbar from './components/Toolbar.vue'
import StatusBar from './components/StatusBar.vue'
import DocEditor from './components/DocEditor.vue'

const docTitle = ref('Coding Interview Practice Document')
const charCount = ref(0)
</script>

<style>
@import './assets/styles.css'; /* Move shared CSS here */
</style>
