'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className={`relative w-full ${maxWidth} modal-panel`}>
        <div className="rpg-card overflow-hidden" style={{ boxShadow: '0 0 60px rgba(220,38,38,0.1), 0 24px 60px rgba(0,0,0,0.9)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4"
               style={{ borderBottom: '1px solid rgba(127,29,29,0.4)' }}>
            <h2 className="font-cinzel font-bold text-sm tracking-[0.2em] text-infernal">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-stone-600 hover:text-stone-200 transition-colors p-1.5 rounded-md hover:bg-stone-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 overflow-y-auto max-h-[80vh]">{children}</div>
        </div>
      </div>
    </div>
  )
}
