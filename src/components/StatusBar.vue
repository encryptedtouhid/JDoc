<template>
  <div class="status-bar">
    <div class="status-item">{{ characterCount }} characters</div>
    <!-- Additional status items can be added here -->
  </div>
</template>

<script setup>
defineProps({
  characterCount: {
    type: Number,
    required: true
  }
});
</script>