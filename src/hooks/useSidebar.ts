// src/hooks/useSidebar.ts
import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean; // เพิ่ม state ใหม่สำหรับ collapsed (เหลือ icon)
  toggle: () => void;
  toggleCollapse: () => void; // ฟังก์ชันใหม่สำหรับสลับ collapsed
  setOpen: (open: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  isCollapsed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setOpen: (open) => set({ isOpen: open }),
}));