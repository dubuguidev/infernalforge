import { Injectable, NotFoundException } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCharacterDto, file?: Express.Multer.File) {
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

  async findOne(id: string) {
    const character = await this.prisma.character.findUnique({
      where: { id },
      include: {
        abilities: true,
      },
    });

    if (!character) {
      throw new NotFoundException('Personagem nao encontrado.');
    }

    return character;
  }

  async update(id: string, dto: UpdateCharacterDto, file?: Express.Multer.File) {
    const existing = await this.findOne(id);

    if (file && existing.imageName) {
      const filePath = join(process.cwd(), 'uploads', 'characters', existing.imageName);
      await unlink(filePath).catch(() => undefined);
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

  async remove(id: string) {
    const existing = await this.findOne(id);

    await this.prisma.character.delete({ where: { id } });

    if (existing.imageName) {
      const filePath = join(process.cwd(), 'uploads', 'characters', existing.imageName);
      await unlink(filePath).catch(() => undefined);
    }

    return;
  }
}
