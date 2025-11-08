<template>
  <router-view v-if="ready" />
</template>

<script>
import { defineComponent } from 'vue'
import { toggleDarkMode } from './helpers/helpers'

export default defineComponent({
  name: 'App',
  data() {
    return {
      ready: false,
    }
  },
  created() {
    // For web version, settings are stored in localStorage
    const settings = localStorage.getItem('settings')
    if (settings) {
      try {
        const data = JSON.parse(settings)
        window.settings = data

        this.root = document.documentElement
        this.root.style.setProperty(
          '--thumbnails-size',
          (data.general?.thumbnailsSize || 150) + 'px'
        )
        if (data.general?.darkMode) {
          toggleDarkMode()
        }
      } catch (e) {
        console.error('Error loading settings:', e)
        // Initialize with defaults
        window.settings = {
          general: {
            thumbnailsSize: 150,
            darkMode: false,
            xxx: false,
            language: 'en'
          }
        }
      }
    } else {
      // Initialize with default settings
      window.settings = {
        general: {
          thumbnailsSize: 150,
          darkMode: false,
          xxx: false,
          language: 'en'
        }
      }
      localStorage.setItem('settings', JSON.stringify(window.settings))
    }
    this.ready = true
  },
})
</script>
