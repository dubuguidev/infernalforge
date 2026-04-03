import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { characterMulterOptions } from '../../config/multer.config';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', characterMulterOptions))
  create(
    @Body() createCharacterDto: CreateCharacterDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.characterService.create(createCharacterDto, file);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', characterMulterOptions))
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.characterService.update(id, updateCharacterDto, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
