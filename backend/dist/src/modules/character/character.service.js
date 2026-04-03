"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const prisma_service_1 = require("../../prisma/prisma.service");
let CharacterService = class CharacterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, file) {
        return this.prisma.character.create({
            data: {
                name: dto.name,
                class: dto.class,
                race: dto.race,
                strength: dto.strength,
                dexterity: dto.dexterity,
                intelligence: dto.intelligence,
                vitality: dto.vitality,
                imageUrl: file ? `/uploads/characters/${file.filename}` : null,
                imageName: file?.filename,
                abilities: {
                    create: dto.abilities.map((abilityName) => ({ name: abilityName })),
                },
            },
            include: {
                abilities: true,
            },
        });
    }
    async findAll() {
        return this.prisma.character.findMany({
            include: {
                abilities: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const character = await this.prisma.character.findUnique({
            where: { id },
            include: {
                abilities: true,
            },
        });
        if (!character) {
            throw new common_1.NotFoundException('Personagem nao encontrado.');
        }
        return character;
    }
    async update(id, dto, file) {
        const existing = await this.findOne(id);
        if (file && existing.imageName) {
            const filePath = (0, path_1.join)(process.cwd(), 'uploads', 'characters', existing.imageName);
            await (0, promises_1.unlink)(filePath).catch(() => undefined);
        }
        const updated = await this.prisma.character.update({
            where: { id },
            data: {
                name: dto.name,
                class: dto.class,
                race: dto.race,
                strength: dto.strength,
                dexterity: dto.dexterity,
                intelligence: dto.intelligence,
                vitality: dto.vitality,
                ...(file
                    ? {
                        imageUrl: `/uploads/characters/${file.filename}`,
                        imageName: file.filename,
                    }
                    : {}),
            },
            include: {
                abilities: true,
            },
        });
        if (dto.abilities) {
            await this.prisma.ability.deleteMany({ where: { characterId: id } });
            await this.prisma.ability.createMany({
                data: dto.abilities.map((abilityName) => ({ name: abilityName, characterId: id })),
            });
        }
        return this.findOne(updated.id);
    }
    async remove(id) {
        const existing = await this.findOne(id);
        await this.prisma.character.delete({ where: { id } });
        if (existing.imageName) {
            const filePath = (0, path_1.join)(process.cwd(), 'uploads', 'characters', existing.imageName);
            await (0, promises_1.unlink)(filePath).catch(() => undefined);
        }
        return;
    }
};
exports.CharacterService = CharacterService;
exports.CharacterService = CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CharacterService);
//# sourceMappingURL=character.service.js.map