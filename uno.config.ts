import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno],
  rules: [['center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }]]
})
