import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { resolve } from 'path';

// Navigate from this file's compiled location back to root:
// dev ts-node: src/prisma → src → backend/  → dev.db
// prod tsc:    dist/src/prisma → dist/src → dist → backend/ → dev.db
const possiblePaths = [
  resolve(__dirname, '..', '..', 'dev.db'),       // dev mode
  resolve(__dirname, '..', '..', '..', 'dev.db'), // prod dist mode
];

const DB_PATH = possiblePaths.find((p) => {
  try {
    require('fs').statSync(p);
    return true;
  } catch {
    return false;
  }
}) ?? possiblePaths[0];

const logger = new Logger('PrismaService');
logger.log(`Connecting to database at: ${DB_PATH}`);

const adapter = new PrismaBetterSqlite3({ url: `file:${DB_PATH}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaInstance = new PrismaClient({ adapter } as any);

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  get user() {
    return prismaInstance.user;
  }

  get character() {
    return prismaInstance.character;
  }

  get ability() {
    return prismaInstance.ability;
  }

  async onModuleInit() {
    await prismaInstance.$connect();
  }

  async onModuleDestroy() {
    await prismaInstance.$disconnect();
  }
}
