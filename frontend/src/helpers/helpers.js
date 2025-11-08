import { i18n } from 'src/boot/i18n.js'
import { emitter } from 'src/boot/mitt.js'
import { copyToClipboard, Dark, Notify } from 'quasar'

export function updateSettings(showNotification = true) {
  // For web version, save to localStorage
  try {
    localStorage.setItem('settings', JSON.stringify(window.settings))
    if (showNotification) {
      Notify.create(i18n.global.t('settings.saved'))
    }
    emitter.emit('settingsSaved')
    return Promise.resolve(true)
  } catch (e) {
    console.error('Error saving settings:', e)
    return Promise.reject(e)
  }
}
export function copyLink(link) {
  copyToClipboard(link).then(() => {
    Notify.create(i18n.global.t('notifications.link_copied'))
  })
}
export function toggleDarkMode() {
  Dark.toggle()
  document.documentElement.style.setProperty(
    '--q-primary',
    Dark.isActive ? '#4d68aa' : '#1f2e5'
  )
}
