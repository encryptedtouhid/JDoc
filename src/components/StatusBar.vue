<template>
    <div class="status-bar">
      <div class="status-item">{{ count }} characters</div>
    </div>
  </template>
  
  <script setup>
  defineProps(['count'])
  </script>
  
  <style scoped>
  .status-bar {
    display: flex;
    height: 24px;
    background-color: #f1f3f4;
    border-top: 1px solid #dadce0;
    padding: 0 16px;
    font-size: 12px;
    color: #5f6368;
    align-items: center;
  }
  
  .status-item {
    margin-right: 16px;
  }
  </style>
  