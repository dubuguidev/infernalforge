import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  characterName?: string
  isLoading?: boolean
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  characterName,
  isLoading,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Exclusão" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center gap-5 py-2">
        <div
          className="w-16 h-16 rounded-full border border-red-900/60 flex items-center justify-center"
          style={{ background: 'rgba(127,29,29,0.2)', boxShadow: '0 0 20px rgba(220,38,38,0.1)' }}
        >
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>

        <div>
          <p className="text-stone-200 text-base leading-relaxed mb-1">
            Deseja realmente excluir
          </p>
          {characterName && (
            <p className="font-cinzel font-bold text-red-400 text-base">
              &ldquo;{characterName}&rdquo;?
            </p>
          )}
          <p className="text-stone-500 text-sm mt-2">Esta ação não pode ser desfeita.</p>
        </div>

        <div className="flex gap-3 w-full">
          <button
            className="rpg-btn-secondary flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            className="rpg-btn-danger flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Excluindo…' : 'Excluir'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
