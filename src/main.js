import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'highlight.js/styles/default.min.css'

// Import highlight.js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);

// Make hljs available globally
window.hljs = hljs;

createApp(App).mount('#app')