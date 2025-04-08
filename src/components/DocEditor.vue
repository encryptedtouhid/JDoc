<template>
  <div class="editor-container">
    <EditorContent :editor="editor" class="doc-editor" />
  </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
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
  content: `
    <p>This is a code block:</p>
    <pre><code class="language-javascript">console.log('Hello world');</code></pre>
  `,
})

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style scoped>
.editor-container {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  background: #fff;
}
.doc-editor pre {
  background: #f6f8fa;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
