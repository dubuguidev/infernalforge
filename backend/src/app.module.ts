import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CharacterModule } from './modules/character/character.module';

@Module({
  imports: [PrismaModule, CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
