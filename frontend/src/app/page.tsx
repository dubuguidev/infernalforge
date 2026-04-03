'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, Plus, Swords } from 'lucide-react'
import CharacterCard from '@/components/CharacterCard'
import ConfirmDialog from '@/components/ConfirmDialog'
import Spinner from '@/components/Spinner'
import { useCharacters, useDeleteCharacter } from '@/hooks/useCharacters'
import toast from 'react-hot-toast'

export default function HomePage() {
  const { data: characters, isLoading, isError } = useCharacters()
  const deleteMutation = useDeleteCharacter()
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null)

  const handleDelete = async () => {
    if (!pendingDelete) return
    try {
      await deleteMutation.mutateAsync(pendingDelete.id)
      toast.success(`"${pendingDelete.name}" foi excluído.`)
    } catch {
      toast.error('Erro ao excluir personagem.')
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Flame
              className="w-6 h-6 text-red-600 flame"
              style={{ filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.6))' }}
            />
            <h1
              className="font-cinzel font-black text-2xl sm:text-3xl tracking-[0.12em] text-stone-100"
              style={{ textShadow: '0 0 32px rgba(220,38,38,0.25)' }}
            >
              Grimório dos Pecadores
            </h1>
            <Flame
              className="w-6 h-6 text-red-600 flame"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.6))',
                animationDelay: '0.6s',
              }}
            />
          </div>
          <p className="text-stone-500 text-base">
            {characters?.length
              ? `${characters.length} personage${characters.length > 1 ? 'ns' : 'm'} registrado${characters.length > 1 ? 's' : ''}`
              : 'Nenhum personagem ainda'}
          </p>
        </div>

        <Link href="/characters/new" className="rpg-btn-primary gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Criar Personagem
        </Link>
      </div>

      {/* Decorative separator */}
      <div
        className="h-px w-full mb-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.6), rgba(220,38,38,0.3), rgba(127,29,29,0.6), transparent)' }}
      />

      {/* States */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Spinner size="lg" />
          <p className="font-cinzel text-xs tracking-[0.3em] text-stone-600 uppercase">
            Invocando personagens…
          </p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
          <p className="text-red-500 font-cinzel text-sm tracking-widest">
            Erro ao carregar personagens
          </p>
          <p className="text-stone-600 text-sm">
            Verifique se o servidor está rodando em <code className="text-stone-400">localhost:3000</code>
          </p>
        </div>
      )}

      {!isLoading && !isError && characters?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center border border-red-950/40"
            style={{ background: 'rgba(127,29,29,0.1)', boxShadow: '0 0 40px rgba(220,38,38,0.05)' }}
          >
            <Swords className="w-10 h-10 text-red-900/60" />
          </div>
          <div>
            <h2 className="font-cinzel font-bold text-lg text-stone-500 mb-2">
              O grimório está vazio
            </h2>
            <p className="text-stone-600 text-sm max-w-xs">
              Nenhum herói foi registrado ainda. Crie o seu primeiro personagem e comece a lenda.
            </p>
          </div>
          <Link href="/characters/new" className="rpg-btn-primary">
            <Plus className="w-4 h-4" />
            Criar Primeiro Personagem
          </Link>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && characters && characters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onDelete={(id) => setPendingDelete({ id, name: character.name })}
            />
          ))}
        </div>
      )}

      {/* Confirm delete dialog */}
      <ConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        characterName={pendingDelete?.name}
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}
