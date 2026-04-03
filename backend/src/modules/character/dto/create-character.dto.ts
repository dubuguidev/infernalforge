import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

const toNumber = (value: unknown): number => Number(value);

const toAbilities = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item));
      }
    } catch {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }
  }

  return [];
};

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  lore?: string;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(0)
  @Max(100)
  strength: number;

  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(0)
  @Max(100)
  dexterity: number;

  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(0)
  @Max(100)
  intelligence: number;

  @Transform(({ value }) => toNumber(value))
  @IsInt()
  @Min(0)
  @Max(100)
  vitality: number;

  @Transform(({ value }) => toAbilities(value))
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @IsString({ each: true })
  abilities: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
