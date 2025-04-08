<!-- DocEditor.vue -->
<template>
  <div class="editor-container">
    <EditorContent :editor="editor" class="doc-editor" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'
const lowlight = createLowlight(common)
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

const editor = new Editor({
  extensions: [
    StarterKit,
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'python', // optional
    }),
  ],
  content: `<pre><code class="language-javascript">console.log('Hello world');</code></pre>`,
})

// Adjust editor height on window resize
const adjustEditorHeight = () => {
  const editorContainer = document.querySelector('.editor-container')
  if (editorContainer) {
    const windowHeight = window.innerHeight
    const containerTop = editorContainer.getBoundingClientRect().top
    const footerHeight = 20 // Adjust based on your layout
    const newHeight = windowHeight - containerTop - footerHeight
    editorContainer.style.height = `${newHeight}px`
  }
}

onMounted(() => {
  adjustEditorHeight()
  window.addEventListener('resize', adjustEditorHeight)
})

onBeforeUnmount(() => {
  editor.destroy()
  window.removeEventListener('resize', adjustEditorHeight)
})
</script>

<style scoped>
.editor-container {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  background: #fff;
  height: 100%; /* Default height before JS adjustment */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.doc-editor {
  flex: 1;
  overflow-y: auto;
}

.doc-editor pre {
  background: #f6f8fa;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}
</style>