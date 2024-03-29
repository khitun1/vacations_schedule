import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': "/Users/ivankhitun/WebstormProjects/vacations_schedule/frontend/src"
    }
  },
})
