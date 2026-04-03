'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Flame } from 'lucide-react'
import CharacterForm from '@/components/CharacterForm'
import Spinner from '@/components/Spinner'
import { useCharacter, useUpdateCharacter } from '@/hooks/useCharacters'
import { useAuth } from '@/hooks/useAuth'
import type { CharacterPayload } from '@/types/character'
import toast from 'react-hot-toast'

export default function EditCharacterPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { isReady, isAuthenticated } = useAuth()
  const { data: character, isLoading, isError } = useCharacter(id)
  const updateMutation = useUpdateCharacter(id)

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isReady, isAuthenticated, router])

  if (!isReady) {
    return (
      <div className="flex justify-center py-36">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  const handleSubmit = async (payload: CharacterPayload) => {
    try {
      const updated = await updateMutation.mutateAsync(payload)
      toast.success(`${updated.name} atualizado!`)
      router.push(`/characters/${id}`)
    } catch {
      toast.error('Erro ao atualizar personagem.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Spinner size="lg" />
        <p className="font-cinzel text-xs tracking-[0.3em] text-stone-600 uppercase">
          Carregando…
        </p>
      </div>
    )
  }

  if (isError || !character) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <p className="font-cinzel text-sm text-stone-500">Personagem não encontrado.</p>
        <Link href="/" className="rpg-btn-secondary">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/characters/${id}`} className="rpg-btn-ghost py-1.5 px-2">
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
            Editar — {character.name}
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-8"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.5), transparent)' }}
      />

      <CharacterForm
        defaultValues={character}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        submitLabel="Salvar Alterações"
      />
    </>
  )
}
