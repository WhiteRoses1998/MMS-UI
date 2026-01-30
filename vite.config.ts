// vite.config.ts (ที่ root)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // ← เพิ่มบรรทัดนี้ (plugin สำหรับ Tailwind v4)
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← เพิ่มบรรทัดนี้ (สำคัญมากที่สุดสำหรับ Tailwind v4)
  ],
  resolve: {
    alias: [
      // รูปแบบ array + find/replacement (สำคัญสำหรับ pre-bundling ใน Vite v5+)
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/components/layout', replacement: path.resolve(__dirname, 'src/components/layout') },
      { find: '@/pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@/features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@/hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@/lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@/router', replacement: path.resolve(__dirname, 'src/router') },
    ],
  },
  optimizeDeps: {
    // บังคับ Vite pre-bundle ไฟล์เหล่านี้ (แก้ปัญหา dependency scan ไม่เจอ)
    include: [
      '@/components/layout/AppLayout',
      '@/pages/Login',
      '@/pages/Dashboard',
      '@/pages/ChangePassword',
      '@/pages/WorkOrderPage',
    ],
  },
  server: {
    fs: {
      strict: false, // ช่วยบน Windows ถ้า path ยาวหรือ symlink
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 👈 port backend ของคุณ
        changeOrigin: true,
      },
    }
  },
})