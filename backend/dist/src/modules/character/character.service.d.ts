import { PrismaService } from '../../prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
export declare class CharacterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCharacterDto, file?: Express.Multer.File): Promise<{
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
    update(id: string, dto: UpdateCharacterDto, file?: Express.Multer.File): Promise<{
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
