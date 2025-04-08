<!-- DocEditor.vue -->
<template>
  <div class="editor-container">
    <div class="code-editor">
      <div class="line-numbers">
        <div v-for="n in lineCount" :key="n" class="line-number">{{ n }}</div>
      </div>
      <EditorContent :editor="editor" class="doc-editor" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'
const lowlight = createLowlight(common)
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

// Track line count
const lineCount = ref(1)

const editor = new Editor({
  extensions: [
    StarterKit,
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'javascript', // default language
    }),
  ],
  content: `<pre><code class="language-javascript">console.log('Hello world!');\n\n// Add some more lines\nconst greeting = 'Welcome to my code editor';\nfunction showMessage(msg) {\n  console.log(msg);\n  return true;\n}\n\nshowMessage(greeting);</code></pre>`,
})

// Calculate line count based on the editor content
const calculateLineCount = () => {
  const docElement = document.querySelector('.doc-editor pre code')
  if (docElement) {
    const content = docElement.textContent || ''
    lineCount.value = (content.match(/\n/g) || []).length + 1
  }
}

// Set up a mutation observer to watch for content changes
let observer = null
const setupObserver = () => {
  if (observer) {
    observer.disconnect()
  }
  
  const targetNode = document.querySelector('.doc-editor')
  if (!targetNode) return
  
  observer = new MutationObserver(() => {
    setTimeout(calculateLineCount, 0)
  })
  
  observer.observe(targetNode, { 
    childList: true, 
    subtree: true, 
    characterData: true 
  })
}

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
  
  // Initial line count and observer setup
  setTimeout(() => {
    calculateLineCount()
    setupObserver()
  }, 100)
})

onBeforeUnmount(() => {
  editor.destroy()
  window.removeEventListener('resize', adjustEditorHeight)
  
  if (observer) {
    observer.disconnect()
  }
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

.code-editor {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: #1e1e1e; /* VSCode-like dark background */
  border-radius: 6px;
}

.line-numbers {
  padding: 1rem 0.5rem;
  background: #252526; /* Slightly lighter than main bg */
  color: #858585; /* Dimmer color for line numbers */
  min-width: 2.5rem;
  text-align: right;
  user-select: none;
  border-right: 1px solid #333;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.line-number {
  height: 1.5em;
}

.doc-editor {
  flex: 1;
  overflow: auto;
  color: #d4d4d4; /* VSCode-like text color */
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.doc-editor pre {
  background: #1e1e1e; /* VSCode-like dark background */
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
}

.doc-editor pre code {
  white-space: pre;
}

/* Syntax highlighting - VSCode-like colors */
.doc-editor pre code .hljs-keyword {
  color: #569cd6; /* blue */
}

.doc-editor pre code .hljs-string {
  color: #ce9178; /* orange */
}

.doc-editor pre code .hljs-function {
  color: #dcdcaa; /* yellow */
}

.doc-editor pre code .hljs-comment {
  color: #6a9955; /* green */
}

.doc-editor pre code .hljs-number {
  color: #b5cea8; /* light green */
}
</style>