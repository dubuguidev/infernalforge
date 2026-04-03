import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query'
import {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from '@/services/characters'
import type { Character, CharacterPayload } from '@/types/character'

export const CHARACTERS_KEY = ['characters'] as const

export function useCharacters(): UseQueryResult<Character[]> {
  return useQuery({ queryKey: CHARACTERS_KEY, queryFn: getCharacters })
}

export function useCharacter(id: string): UseQueryResult<Character> {
  return useQuery({
    queryKey: [...CHARACTERS_KEY, id],
    queryFn: () => getCharacter(id),
    enabled: Boolean(id),
  })
}

export function useCreateCharacter() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CharacterPayload) => createCharacter(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: CHARACTERS_KEY }),
  })
}

export function useUpdateCharacter(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CharacterPayload) => updateCharacter(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CHARACTERS_KEY })
      qc.invalidateQueries({ queryKey: [...CHARACTERS_KEY, id] })
    },
  })
}

export function useDeleteCharacter() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCharacter(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: CHARACTERS_KEY }),
  })
}
