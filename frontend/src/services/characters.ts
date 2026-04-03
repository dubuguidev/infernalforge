import type { Character, CharacterPayload } from '@/types/character'
import { apiClient } from './api'

function buildFormData(payload: CharacterPayload): FormData {
  const form = new FormData()
  form.append('name', payload.name)
  form.append('lore', payload.lore ?? '')
  form.append('class', payload.class)
  form.append('race', payload.race)
  form.append('strength', String(payload.strength))
  form.append('dexterity', String(payload.dexterity))
  form.append('intelligence', String(payload.intelligence))
  form.append('vitality', String(payload.vitality))
  form.append('abilities', JSON.stringify(payload.abilities))
  if (payload.image) form.append('image', payload.image)
  return form
}

export async function getCharacters(): Promise<Character[]> {
  const { data } = await apiClient.get<Character[]>('/character')
  return data
}

export async function getCharacter(id: string): Promise<Character> {
  const { data } = await apiClient.get<Character>(`/character/${id}`)
  return data
}

export async function createCharacter(payload: CharacterPayload): Promise<Character> {
  const { data } = await apiClient.post<Character>('/character', buildFormData(payload))
  return data
}

export async function updateCharacter(
  id: string,
  payload: CharacterPayload,
): Promise<Character> {
  const { data } = await apiClient.put<Character>(`/character/${id}`, buildFormData(payload))
  return data
}

export async function deleteCharacter(id: string): Promise<void> {
  await apiClient.delete(`/character/${id}`)
}
