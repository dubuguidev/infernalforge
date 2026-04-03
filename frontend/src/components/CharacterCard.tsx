'use client'

import Link from 'next/link'
import { Pencil, Trash2, Swords, Shield, Brain, Heart, User, Flame } from 'lucide-react'
import StatBar from './StatBar'
import AbilityBadge from './AbilityBadge'
import type { Character } from '@/types/character'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

const STATS = [
  { key: 'strength' as const,     label: 'FOR', icon: <Swords className="w-2.5 h-2.5" />, color: 'bg-red-700' },
  { key: 'dexterity' as const,    label: 'DES', icon: <Shield className="w-2.5 h-2.5" />, color: 'bg-orange-600' },
  { key: 'intelligence' as const, label: 'INT', icon: <Brain  className="w-2.5 h-2.5" />, color: 'bg-amber-500' },
  { key: 'vitality' as const,     label: 'VIT', icon: <Heart  className="w-2.5 h-2.5" />, color: 'bg-rose-700' },
]

interface Props {
  character: Character
  onDelete: (id: string) => void
}

export default function CharacterCard({ character, onDelete }: Props) {
  const imgSrc = character.imageUrl ? `${API_URL}${character.imageUrl}` : null

  return (
    <div
      className="rpg-card-hover group relative overflow-hidden rounded-lg"
      style={{
        border: '2px solid rgba(100,20,10,0.85)',
        background: 'linear-gradient(175deg, #1c0b0b 0%, #0f0a0a 60%, #0a0808 100%)',
        boxShadow: '0 0 18px rgba(180,30,10,0.08), inset 0 0 20px rgba(0,0,0,0.4)',
        perspective: '1200px',
      }}
    >
      <div
        className="relative min-h-[340px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* Front face */}
        <div
          className="absolute inset-0 z-10 flex flex-col group-hover:pointer-events-none"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div
            className="flex items-center justify-between px-2.5 pt-2 pb-1.5"
            style={{ borderBottom: '1px solid rgba(100,20,10,0.55)' }}
          >
            <h3
              className="font-cinzel font-bold text-[11px] tracking-wide text-stone-100 truncate leading-tight"
              style={{ textShadow: '0 0 10px rgba(220,38,38,0.25)' }}
            >
              {character.name}
            </h3>
            <Flame className="w-3 h-3 text-red-700/50 flex-shrink-0 ml-1.5" />
          </div>

          <div
            className="relative mx-2 mt-1.5 overflow-hidden rounded-sm flex-shrink-0"
            style={{ aspectRatio: '4 / 3' }}
          >
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc}
                alt={character.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-950">
                <User className="w-10 h-10 text-stone-700" />
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-red-950/50" />
          </div>

          <div
            className="mx-2 mt-1.5 px-2 py-0.5 flex items-center gap-1.5 rounded-sm"
            style={{ background: 'rgba(80,15,10,0.35)', border: '1px solid rgba(100,20,10,0.4)' }}
          >
            <span className="text-[9px] font-cinzel tracking-widest text-red-400/75 truncate">{character.class}</span>
            <span className="text-stone-700 flex-shrink-0 text-[9px]">·</span>
            <span className="text-[9px] text-stone-500 truncate">{character.race}</span>
          </div>

          <Link
            href={`/characters/${character.id}`}
            className="flex flex-col flex-1 px-2.5 py-2 focus:outline-none"
          >
            <div className="space-y-1">
              {STATS.map(({ key, label, icon, color }) => (
                <StatBar key={key} label={label} value={character[key]} icon={icon} color={color} compact />
              ))}
            </div>

            {character.abilities.length > 0 && (
              <div
                className="flex flex-wrap gap-0.5 mt-2 pt-1.5"
                style={{ borderTop: '1px solid rgba(100,20,10,0.3)' }}
              >
                {character.abilities.slice(0, 2).map((ab) => (
                  <AbilityBadge key={ab.id} name={ab.name} size="sm" />
                ))}
                {character.abilities.length > 2 && (
                  <span className="text-[9px] font-cinzel text-stone-600 self-center">
                    +{character.abilities.length - 2}
                  </span>
                )}
              </div>
            )}
          </Link>

          <div
            className="px-2.5 py-1.5 flex items-center justify-end gap-1"
            style={{ borderTop: '1px solid rgba(100,20,10,0.45)', background: 'rgba(0,0,0,0.25)' }}
          >
            <Link
              href={`/characters/${character.id}/edit`}
              className="w-6 h-6 flex items-center justify-center rounded bg-black/50 border border-stone-700/40
                         text-stone-500 hover:text-stone-200 hover:border-stone-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
              title="Editar personagem"
            >
              <Pencil className="w-3 h-3" />
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(character.id) }}
              className="w-6 h-6 flex items-center justify-center rounded bg-black/50 border border-red-950/50
                         text-red-600/60 hover:text-red-400 hover:border-red-800/60 transition-colors"
              title="Excluir personagem"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 z-20 flex flex-col pointer-events-none group-hover:pointer-events-auto"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div
            className="flex items-center justify-between px-2.5 pt-2 pb-1.5"
            style={{ borderBottom: '1px solid rgba(100,20,10,0.55)' }}
          >
            <h3
              className="font-cinzel font-bold text-[11px] tracking-wide text-stone-100 truncate leading-tight"
              style={{ textShadow: '0 0 10px rgba(220,38,38,0.25)' }}
            >
              Lore de {character.name}
            </h3>
            <Flame className="w-3 h-3 text-red-700/50 flex-shrink-0 ml-1.5" />
          </div>

          <div className="flex-1 p-2.5">
            <div
              className="h-full rounded-sm border border-red-950/60 bg-black/45 px-2.5 py-2 overflow-y-auto"
            >
              <p className="text-[10px] text-stone-300 leading-relaxed whitespace-pre-line">
                {character.lore?.trim() || 'Sem história registrada para este personagem.'}
              </p>
            </div>
          </div>

          <div
            className="px-2.5 py-1.5 flex items-center justify-between gap-1"
            style={{ borderTop: '1px solid rgba(100,20,10,0.45)', background: 'rgba(0,0,0,0.25)' }}
          >
            <Link
              href={`/characters/${character.id}`}
              className="text-[9px] font-cinzel tracking-[0.14em] text-stone-400 hover:text-stone-200 transition-colors"
            >
              Ver ficha
            </Link>

            <div className="flex gap-1">
              <Link
                href={`/characters/${character.id}/edit`}
                className="w-6 h-6 flex items-center justify-center rounded bg-black/50 border border-stone-700/40
                           text-stone-500 hover:text-stone-200 hover:border-stone-500 transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Editar personagem"
              >
                <Pencil className="w-3 h-3" />
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(character.id) }}
                className="w-6 h-6 flex items-center justify-center rounded bg-black/50 border border-red-950/50
                           text-red-600/60 hover:text-red-400 hover:border-red-800/60 transition-colors"
                title="Excluir personagem"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
