import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': "D:\\Универ\\Магистратура\\1-ый курс\\Научные исследования\\viteVacation\\src"
    }
  },
})
