'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Pencil, Trash2, Flame, Swords, Shield, Brain, Heart } from 'lucide-react'
import CharacterCardPreview from '@/components/CharacterCardPreview'
import ConfirmDialog from '@/components/ConfirmDialog'
import Spinner from '@/components/Spinner'
import AbilityBadge from '@/components/AbilityBadge'
import StatBar from '@/components/StatBar'
import { useCharacter, useDeleteCharacter } from '@/hooks/useCharacters'
import toast from 'react-hot-toast'

const STATS = [
  { key: 'strength'     as const, label: 'Força',        icon: <Swords className="w-3.5 h-3.5" />, color: 'bg-red-700' },
  { key: 'dexterity'    as const, label: 'Destreza',      icon: <Shield className="w-3.5 h-3.5" />, color: 'bg-orange-600' },
  { key: 'intelligence' as const, label: 'Inteligência',  icon: <Brain  className="w-3.5 h-3.5" />, color: 'bg-amber-500' },
  { key: 'vitality'     as const, label: 'Vitalidade',    icon: <Heart  className="w-3.5 h-3.5" />, color: 'bg-rose-700' },
]

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: character, isLoading, isError } = useCharacter(id)
  const deleteMutation = useDeleteCharacter()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = async () => {
    if (!character) return
    try {
      await deleteMutation.mutateAsync(character.id)
      toast.success(`"${character.name}" foi excluído.`)
      router.push('/')
    } catch {
      toast.error('Erro ao excluir personagem.')
      setConfirmOpen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Spinner size="lg" />
        <p className="font-cinzel text-xs tracking-[0.3em] text-stone-600 uppercase">
          Convocando personagem…
        </p>
      </div>
    )
  }

  if (isError || !character) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
        <Swords className="w-12 h-12 text-red-900/40" />
        <p className="font-cinzel text-sm tracking-widest text-stone-500">
          Personagem não encontrado
        </p>
        <Link href="/" className="rpg-btn-secondary mt-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Grimório
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="rpg-btn-ghost py-1.5 px-2">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <Flame
              className="w-5 h-5 text-red-600 flame"
              style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.5))' }}
            />
            <h1
              className="font-cinzel font-black text-xl sm:text-2xl tracking-[0.1em] text-stone-100 truncate"
              style={{ textShadow: '0 0 24px rgba(220,38,38,0.2)' }}
            >
              {character.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/characters/${character.id}/edit`}
            className="rpg-btn-secondary gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Editar</span>
          </Link>
          <button
            className="rpg-btn-danger gap-2"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(127,29,29,0.5), transparent)' }}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Large card preview */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <CharacterCardPreview
            data={{
              name:         character.name,
              class:        character.class,
              race:         character.race,
              strength:     character.strength,
              dexterity:    character.dexterity,
              intelligence: character.intelligence,
              vitality:     character.vitality,
              abilities:    character.abilities.map((a) => a.name),
              imageUrl:     character.imageUrl,
            }}
            large
          />
        </div>

        {/* Right: Detail panel */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Identity */}
          <div className="rpg-card p-6">
            <p className="rpg-section-title">Identidade</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="rpg-label">Classe</p>
                <p className="text-red-400 font-cinzel text-base">{character.class}</p>
              </div>
              <div>
                <p className="rpg-label">Raça</p>
                <p className="text-stone-300 text-base">{character.race}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="rpg-card p-6">
            <p className="rpg-section-title">Atributos</p>
            <div className="space-y-4">
              {STATS.map(({ key, label, icon, color }) => (
                <StatBar
                  key={key}
                  label={label}
                  value={character[key]}
                  icon={icon}
                  color={color}
                />
              ))}
            </div>
          </div>

          {/* Abilities */}
          {character.abilities.length > 0 && (
            <div className="rpg-card p-6">
              <p className="rpg-section-title">Habilidades</p>
              <div className="flex flex-wrap gap-2">
                {character.abilities.map((ab) => (
                  <AbilityBadge key={ab.id} name={ab.name} />
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="rpg-card p-6">
            <p className="rpg-section-title">Registro</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="rpg-label">Criado em</p>
                <p className="text-stone-400 text-sm">
                  {new Date(character.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="rpg-label">Atualizado em</p>
                <p className="text-stone-400 text-sm">
                  {new Date(character.updatedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm delete */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        characterName={character.name}
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}
