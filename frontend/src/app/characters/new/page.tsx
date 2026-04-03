'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Flame } from 'lucide-react'
import Link from 'next/link'
import CharacterForm from '@/components/CharacterForm'
import { useCreateCharacter } from '@/hooks/useCharacters'
import type { CharacterPayload } from '@/types/character'
import toast from 'react-hot-toast'

export default function NewCharacterPage() {
  const router = useRouter()
  const createMutation = useCreateCharacter()

  const handleSubmit = async (payload: CharacterPayload) => {
    try {
      const character = await createMutation.mutateAsync(payload)
      toast.success(`${character.name} foi convocado!`)
      router.push('/')
    } catch {
      toast.error('Erro ao criar personagem. Verifique os dados e tente novamente.')
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="rpg-btn-ghost py-1.5 px-2">
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="flex items-center gap-3">
          <Flame
            className="w-5 h-5 text-red-600 flame"
            style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.5))' }}
          />
          <h1
            className="font-cinzel font-black text-xl sm:text-2xl tracking-[0.12em] text-stone-100"
            style={{ textShadow: '0 0 24px rgba(220,38,38,0.2)' }}
          >
            Criar Personagem
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-8"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.5), transparent)' }}
      />

      <CharacterForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
        submitLabel="Convocar Personagem"
      />
    </>
  )
}
