<template>
  <div class="status-bar">
    <div class="status-item">{{ characterCount }} characters</div>
    <div class="status-item save-status" :class="{ 'visible': showSaveStatus }">
      {{ saveMessage }}
    </div>
    <div class="status-item last-saved" v-if="lastSaved">
      Last saved: {{ lastSaved }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  characterCount: {
    type: Number,
    required: true
  }
});

const showSaveStatus = ref(false);
const saveMessage = ref('Saved');
const lastSaved = ref('');

// Create a save indicator that appears briefly
const showSavedIndicator = () => {
  showSaveStatus.value = true;
  setTimeout(() => {
    showSaveStatus.value = false;
  }, 2000);
  
  // Update the last saved time
  updateLastSavedTime();
};

// Update the "Last saved" timestamp
const updateLastSavedTime = () => {
  try {
    const savedState = localStorage.getItem('jdoc-document-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.lastModified) {
        const date = new Date(parsedState.lastModified);
        lastSaved.value = formatTime(date);
      }
    }
  } catch (error) {
    console.error('Error getting last saved time:', error);
  }
};

// Format time as "Today at HH:MM AM/PM" or "DD/MM/YYYY at HH:MM AM/PM"
const formatTime = (date) => {
  const now = new Date();
  const isToday = date.getDate() === now.getDate() && 
                 date.getMonth() === now.getMonth() && 
                 date.getFullYear() === now.getFullYear();
  
  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  const timeString = date.toLocaleTimeString(undefined, timeOptions);
  
  if (isToday) {
    return `Today at ${timeString}`;
  } else {
    const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const dateString = date.toLocaleDateString(undefined, dateOptions);
    return `${dateString} at ${timeString}`;
  }
};

// Watch for changes to characterCount to show the save indicator
watch(() => props.characterCount, () => {
  showSavedIndicator();
});

// Check for saved state on component mount
onMounted(() => {
  updateLastSavedTime();
  
  // Set up storage event listener to update if localStorage changes in another tab
  window.addEventListener('storage', (event) => {
    if (event.key === 'jdoc-document-state') {
      updateLastSavedTime();
    }
  });
});

// Clean up event listener on unmount
onUnmounted(() => {
  window.removeEventListener('storage', updateLastSavedTime);
});
</script>

<style scoped>
.save-status {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  color: #4caf50;
  font-weight: 500;
}

.save-status.visible {
  opacity: 1;
}

.last-saved {
  margin-left: auto;
}
</style>