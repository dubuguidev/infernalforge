import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterService } from './character.service';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    create(createCharacterDto: CreateCharacterDto, file?: Express.Multer.File): Promise<{
        abilities: {
            name: string;
            id: string;
            characterId: string;
        }[];
    } & {
        name: string;
        class: string;
        race: string;
        strength: number;
        dexterity: number;
        intelligence: number;
        vitality: number;
        imageUrl: string | null;
        id: string;
        imageName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        abilities: {
            name: string;
            id: string;
            characterId: string;
        }[];
    } & {
        name: string;
        class: string;
        race: string;
        strength: number;
        dexterity: number;
        intelligence: number;
        vitality: number;
        imageUrl: string | null;
        id: string;
        imageName: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        abilities: {
            name: string;
            id: string;
            characterId: string;
        }[];
    } & {
        name: string;
        class: string;
        race: string;
        strength: number;
        dexterity: number;
        intelligence: number;
        vitality: number;
        imageUrl: string | null;
        id: string;
        imageName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateCharacterDto: UpdateCharacterDto, file?: Express.Multer.File): Promise<{
        abilities: {
            name: string;
            id: string;
            characterId: string;
        }[];
    } & {
        name: string;
        class: string;
        race: string;
        strength: number;
        dexterity: number;
        intelligence: number;
        vitality: number;
        imageUrl: string | null;
        id: string;
        imageName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<void>;
}
