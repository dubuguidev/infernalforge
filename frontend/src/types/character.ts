export interface Ability {
  id: string
  name: string
  characterId: string
}

export interface Character {
  id: string
  name: string
  class: string
  race: string
  strength: number
  dexterity: number
  intelligence: number
  vitality: number
  imageUrl: string | null
  imageName: string | null
  abilities: Ability[]
  createdAt: string
  updatedAt: string
}

export interface CharacterPayload {
  name: string
  class: string
  race: string
  strength: number
  dexterity: number
  intelligence: number
  vitality: number
  abilities: string[]
  image?: File
}
