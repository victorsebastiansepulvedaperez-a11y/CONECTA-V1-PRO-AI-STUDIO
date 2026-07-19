import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Si usas React. Si usas Vanilla JS, puedes borrar esta línea.

export default defineConfig({
  base: './',
  plugins: [react()] // Si borraste la línea de arriba, borra también esta línea de plugins.
})
