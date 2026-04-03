import axios from 'axios'
import type { Character, CharacterPayload } from '@/types/character'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

const client = axios.create({ baseURL: API_URL })

function buildFormData(payload: CharacterPayload): FormData {
  const form = new FormData()
  form.append('name', payload.name)
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
  const { data } = await client.get<Character[]>('/character')
  return data
}

export async function getCharacter(id: string): Promise<Character> {
  const { data } = await client.get<Character>(`/character/${id}`)
  return data
}

export async function createCharacter(payload: CharacterPayload): Promise<Character> {
  const { data } = await client.post<Character>('/character', buildFormData(payload))
  return data
}

export async function updateCharacter(
  id: string,
  payload: CharacterPayload,
): Promise<Character> {
  const { data } = await client.put<Character>(`/character/${id}`, buildFormData(payload))
  return data
}

export async function deleteCharacter(id: string): Promise<void> {
  await client.delete(`/character/${id}`)
}
