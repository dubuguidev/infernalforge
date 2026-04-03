'use client'

import { useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, Upload, ImageOff, Swords, Shield, Brain, Heart } from 'lucide-react'
import Spinner from './Spinner'
import CharacterCardPreview from './CharacterCardPreview'
import { useImagePreview } from '@/hooks/useImagePreview'
import type { CharacterPayload } from '@/types/character'
import type { Character } from '@/types/character'

/* ─── Schema ─── */
const schema = z.object({
  name:         z.string().min(1, 'Nome é obrigatório').max(60),
  lore:         z.string().max(600).optional(),
  class:        z.string().min(1, 'Classe é obrigatória').max(40),
  race:         z.string().min(1, 'Raça é obrigatória').max(40),
  strength:     z.coerce.number().int().min(0).max(100),
  dexterity:    z.coerce.number().int().min(0).max(100),
  intelligence: z.coerce.number().int().min(0).max(100),
  vitality:     z.coerce.number().int().min(0).max(100),
  abilities:    z
    .array(z.object({ value: z.string().min(1, 'Habilidade não pode estar vazia').max(40) }))
    .min(1, 'Adicione ao menos 1 habilidade')
    .max(20),
})

type FormValues = z.infer<typeof schema>

/* ─── Common RPG classes & races ─── */
const CLASSES = ['Guerreiro', 'Mago', 'Ladrão', 'Paladino', 'Necromante', 'Druida', 'Monge', 'Arqueiro', 'Bárbaro', 'Feiticeiro']
const RACES   = ['Humano', 'Elfo', 'Anão', 'Meio-Orc', 'Gnomo', 'Halfling', 'Tiefling', 'Draconato', 'Semielfo']

const STAT_CONFIG = [
  { name: 'strength'     as const, label: 'Força',       icon: <Swords className="w-4 h-4 text-red-500" />,       color: 'bg-red-700' },
  { name: 'dexterity'    as const, label: 'Destreza',     icon: <Shield className="w-4 h-4 text-orange-500" />,    color: 'bg-orange-600' },
  { name: 'intelligence' as const, label: 'Inteligência', icon: <Brain  className="w-4 h-4 text-amber-400" />,     color: 'bg-amber-500' },
  { name: 'vitality'     as const, label: 'Vitalidade',   icon: <Heart  className="w-4 h-4 text-rose-500" />,      color: 'bg-rose-700' },
]

/* ─── Props ─── */
interface CharacterFormProps {
  defaultValues?: Character
  onSubmit: (payload: CharacterPayload) => Promise<void>
  isLoading?: boolean
  submitLabel?: string
}

export default function CharacterForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = 'Salvar Personagem',
}: CharacterFormProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageClearRequested, setImageClearRequested] = useState(false)
  const imagePreview = useImagePreview(imageFile)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:         defaultValues?.name ?? '',
      lore:         defaultValues?.lore ?? '',
      class:        defaultValues?.class ?? '',
      race:         defaultValues?.race ?? '',
      strength:     defaultValues?.strength ?? 10,
      dexterity:    defaultValues?.dexterity ?? 10,
      intelligence: defaultValues?.intelligence ?? 10,
      vitality:     defaultValues?.vitality ?? 10,
      abilities:    defaultValues?.abilities.map((a) => ({ value: a.name })) ?? [{ value: '' }],
    },
  })

  const { register, control, watch, handleSubmit, formState: { errors } } = form

  const { fields, append, remove } = useFieldArray({ control, name: 'abilities' })

  const watched = watch()

  /* Determine preview image src */
  const previewImageUrl = imageClearRequested
    ? null
    : defaultValues?.imageUrl ?? null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImageClearRequested(false)
  }

  const handleClearImage = () => {
    setImageFile(null)
    setImageClearRequested(true)
    if (fileRef.current) fileRef.current.value = ''
  }

  const submit = async (values: FormValues) => {
    const payload: CharacterPayload = {
      name:         values.name,
      lore:         values.lore?.trim() ? values.lore.trim() : undefined,
      class:        values.class,
      race:         values.race,
      strength:     values.strength,
      dexterity:    values.dexterity,
      intelligence: values.intelligence,
      vitality:     values.vitality,
      abilities:    values.abilities.map((a) => a.value),
      image:        imageFile ?? undefined,
    }
    await onSubmit(payload)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* ── Form ── */}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex-1 min-w-0 space-y-8"
        noValidate
      >
        {/* Section: Info Básica */}
        <section>
          <p className="rpg-section-title">Informações Básicas</p>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="rpg-label">Nome do Personagem</label>
              <input
                {...register('name')}
                className={`rpg-input ${errors.name ? 'rpg-input-error' : ''}`}
                placeholder="Ex: Kael, Destruidor das Sombras"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Class + Race row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="rpg-label">Classe</label>
                <input
                  {...register('class')}
                  list="classes-list"
                  className={`rpg-input ${errors.class ? 'rpg-input-error' : ''}`}
                  placeholder="Ex: Guerreiro"
                />
                <datalist id="classes-list">
                  {CLASSES.map((c) => <option key={c} value={c} />)}
                </datalist>
                {errors.class && (
                  <p className="mt-1 text-red-500 text-xs">{errors.class.message}</p>
                )}
              </div>

              <div>
                <label className="rpg-label">Raça</label>
                <input
                  {...register('race')}
                  list="races-list"
                  className={`rpg-input ${errors.race ? 'rpg-input-error' : ''}`}
                  placeholder="Ex: Elfo"
                />
                <datalist id="races-list">
                  {RACES.map((r) => <option key={r} value={r} />)}
                </datalist>
                {errors.race && (
                  <p className="mt-1 text-red-500 text-xs">{errors.race.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="rpg-label">Lore (história curta)</label>
              <textarea
                {...register('lore')}
                className="rpg-input min-h-28 resize-y"
                placeholder="Ex: Sobreviveu ao cerco de Nhalgor e jurou caçar os hereges do Vale Cinzento..."
                maxLength={600}
              />
              <p className="mt-1 text-xs text-stone-600">
                {String(watched.lore?.length ?? 0)}/600 caracteres
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="rpg-ornament">✦</div>

        {/* Section: Atributos */}
        <section>
          <p className="rpg-section-title">Atributos</p>
          <div className="space-y-5">
            {STAT_CONFIG.map(({ name, label, icon }) => {
              const val = Number(watched[name] ?? 0)
              return (
                <div key={name}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 rpg-label mb-0">
                      {icon}
                      {label}
                    </label>
                    <span className="font-cinzel font-bold text-stone-200 text-sm tabular-nums">
                      {val}
                      <span className="text-stone-600 font-normal">/100</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    {...register(name)}
                    className="w-full"
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="rpg-ornament">✦</div>

        {/* Section: Habilidades */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <p className="rpg-section-title mb-0">
              Habilidades
              <span className="ml-2 text-stone-700 normal-case tracking-normal font-crimson font-normal text-xs">
                ({fields.length}/20)
              </span>
            </p>
            {fields.length < 20 && (
              <button
                type="button"
                onClick={() => append({ value: '' })}
                className="rpg-btn-ghost text-xs py-1 px-2 gap-1"
              >
                <Plus className="w-3 h-3" />
                Adicionar
              </button>
            )}
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`abilities.${index}.value`)}
                  className={`rpg-input flex-1 ${errors.abilities?.[index]?.value ? 'rpg-input-error' : ''}`}
                  placeholder={`Habilidade ${index + 1}`}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg
                               border border-red-950/60 text-red-500/60 bg-red-950/20
                               hover:text-red-400 hover:border-red-800/60 hover:bg-red-950/40 transition-colors"
                    title="Remover habilidade"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {errors.abilities && !Array.isArray(errors.abilities) && (
            <p className="mt-2 text-red-500 text-xs">{errors.abilities.message}</p>
          )}
        </section>

        {/* Divider */}
        <div className="rpg-ornament">✦</div>

        {/* Section: Imagem */}
        <section>
          <p className="rpg-section-title">Imagem do Personagem</p>

          <div
            className="relative border-2 border-dashed border-stone-800 rounded-xl overflow-hidden
                       hover:border-red-900/60 transition-colors cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            {imagePreview ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity
                                flex items-center justify-center">
                  <span className="font-cinzel text-xs tracking-widest text-white">Trocar imagem</span>
                </div>
              </div>
            ) : previewImageUrl ? (
              /* existing image from backend */
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}${previewImageUrl}`}
                  alt="Imagem atual"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity
                                flex items-center justify-center">
                  <span className="font-cinzel text-xs tracking-widest text-white">Trocar imagem</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-stone-600">
                <Upload className="w-8 h-8" />
                <div className="text-center">
                  <p className="font-cinzel text-xs tracking-widest uppercase mb-1">
                    Clique para carregar
                  </p>
                  <p className="text-xs">PNG, JPG ou WebP — máx. 5 MB</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          {(imageFile || previewImageUrl) && (
            <button
              type="button"
              onClick={handleClearImage}
              className="mt-2 flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-400 transition-colors"
            >
              <ImageOff className="w-3 h-3" />
              Remover imagem
            </button>
          )}
        </section>

        {/* Submit */}
        <div className="pt-2">
          <button type="submit" className="rpg-btn-primary w-full py-3" disabled={isLoading}>
            {isLoading ? (
              <><Spinner size="sm" /><span>Salvando…</span></>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </form>

      {/* ── Live Preview ── */}
      <aside className="lg:w-80 xl:w-96 flex-shrink-0">
        <div className="lg:sticky lg:top-24">
          <p className="rpg-section-title text-center mb-4">Pré-visualização</p>
          <CharacterCardPreview
            data={{
              name:         watched.name,
              lore:         watched.lore,
              class:        watched.class,
              race:         watched.race,
              strength:     Number(watched.strength ?? 0),
              dexterity:    Number(watched.dexterity ?? 0),
              intelligence: Number(watched.intelligence ?? 0),
              vitality:     Number(watched.vitality ?? 0),
              abilities:    watched.abilities?.map((a) => a.value).filter(Boolean),
              imagePreview: imagePreview ?? undefined,
              imageUrl:     imageClearRequested ? null : previewImageUrl,
            }}
            large
          />
        </div>
      </aside>
    </div>
  )
}
