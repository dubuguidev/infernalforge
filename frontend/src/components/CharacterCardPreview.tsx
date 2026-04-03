import { Swords, Shield, Brain, Heart, Flame, User } from 'lucide-react'
import StatBar from './StatBar'
import AbilityBadge from './AbilityBadge'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export interface PreviewData {
  name?: string
  class?: string
  race?: string
  strength?: number
  dexterity?: number
  intelligence?: number
  vitality?: number
  abilities?: string[]
  imagePreview?: string | null   // local blob URL
  imageUrl?: string | null       // URL from backend (relative)
}

const STAT_CONFIG = [
  { key: 'strength',     label: 'Força',         icon: <Swords    className="w-3 h-3" />, color: 'bg-red-700' },
  { key: 'dexterity',    label: 'Destreza',       icon: <Shield    className="w-3 h-3" />, color: 'bg-orange-600' },
  { key: 'intelligence', label: 'Inteligência',   icon: <Brain     className="w-3 h-3" />, color: 'bg-amber-500' },
  { key: 'vitality',     label: 'Vitalidade',     icon: <Heart     className="w-3 h-3" />, color: 'bg-rose-700' },
] as const

interface Props {
  data: PreviewData
  large?: boolean
}

export default function CharacterCardPreview({ data, large = false }: Props) {
  const {
    name = 'Nome do Personagem',
    class: cls = 'Classe',
    race = 'Raça',
    strength = 0,
    dexterity = 0,
    intelligence = 0,
    vitality = 0,
    abilities = [],
    imagePreview,
    imageUrl,
  } = data

  const imgSrc = imagePreview ?? (imageUrl ? `${API_URL}${imageUrl}` : null)

  return (
    <div
      className="rpg-card overflow-hidden select-none"
      style={{
        border: '1px solid rgba(127,29,29,0.6)',
        boxShadow: '0 0 40px rgba(220,38,38,0.08), 0 8px 48px rgba(0,0,0,0.9)',
      }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #7f1d1d, #dc2626, #7f1d1d, transparent)' }}
      />

      {/* Image section */}
      <div className={`relative w-full ${large ? 'h-80' : 'h-52'} bg-stone-950 flex items-center justify-center overflow-hidden`}>
        {imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-stone-700">
            <User className="w-16 h-16" />
            <span className="font-cinzel text-xs tracking-widest uppercase">Sem imagem</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0f0f0f 0%, transparent 50%)' }}
        />

        {/* Flame icon watermark */}
        <div className="absolute top-3 right-3 opacity-30">
          <Flame className="w-5 h-5 text-red-600" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Name */}
        <h2
          className={`font-cinzel font-black tracking-wider mb-1 text-stone-100 ${large ? 'text-2xl' : 'text-lg'}`}
          style={{ textShadow: '0 0 20px rgba(220,38,38,0.25)' }}
        >
          {name}
        </h2>

        {/* Class + Race */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-red-400/90 font-cinzel tracking-wide">{cls}</span>
          <span className="text-stone-600 text-xs">•</span>
          <span className="text-sm text-stone-400 font-crimson">{race}</span>
        </div>

        {/* Divider */}
        <div className="rpg-ornament text-[10px] font-cinzel tracking-widest mb-4">
          ATRIBUTOS
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-5">
          {STAT_CONFIG.map(({ key, label, icon, color }) => (
            <StatBar
              key={key}
              label={label}
              value={data[key] ?? 0}
              icon={icon}
              color={color}
              compact={!large}
            />
          ))}
        </div>

        {/* Abilities */}
        {abilities.length > 0 && (
          <>
            <div className="rpg-ornament text-[10px] font-cinzel tracking-widest mb-3">
              HABILIDADES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {abilities.map((ab, i) => (
                <AbilityBadge key={i} name={ab} size={large ? 'md' : 'sm'} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #3f0a0a, transparent)' }}
      />
    </div>
  )
}
