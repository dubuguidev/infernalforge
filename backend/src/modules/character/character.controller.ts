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
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { characterMulterOptions } from '../../config/multer.config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtUser } from '../auth/types/jwt-user.type';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterService } from './character.service';

@Controller('character')
@UseGuards(JwtAuthGuard)
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', characterMulterOptions))
  create(
    @Req() req: Request,
    @Body() createCharacterDto: CreateCharacterDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = req.user as JwtUser;
    return this.characterService.create(user.sub, createCharacterDto, file);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as JwtUser;
    return this.characterService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JwtUser;
    return this.characterService.findOne(id, user.sub);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', characterMulterOptions))
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = req.user as JwtUser;
    return this.characterService.update(id, user.sub, updateCharacterDto, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JwtUser;
    return this.characterService.remove(id, user.sub);
  }
}
