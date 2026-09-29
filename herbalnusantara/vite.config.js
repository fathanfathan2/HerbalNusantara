import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logoherbaln.png'], // sesuaikan jika nama file logomu beda
      manifest: {
        name: 'Herbal Nusantara',
        short_name: 'HerbalNusa',
        description: 'Aplikasi Deteksi dan Racikan Herbal Tradisional',
        theme_color: '#047857',
        background_color: '#fafaf9',
        display: 'standalone', // Ini yang membuatnya full screen seperti APK
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})