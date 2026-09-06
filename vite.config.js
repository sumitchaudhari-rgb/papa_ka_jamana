import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      copyDir(path.resolve(__dirname, 'songs'), path.join(dist, 'songs'))
      copyDir(path.resolve(__dirname, 'assets'), path.join(dist, 'assets'))
    }
  }
}

export default defineConfig({
  plugins: [react(), copyStaticAssetsPlugin()],
})
