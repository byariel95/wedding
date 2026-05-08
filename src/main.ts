import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import './assets/styles/main.css'

// Register GSAP plugins globally — must happen before any component uses ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)
app.mount('#app')
