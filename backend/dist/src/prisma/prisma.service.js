"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const path_1 = require("path");
const possiblePaths = [
    (0, path_1.resolve)(__dirname, '..', '..', 'dev.db'),
    (0, path_1.resolve)(__dirname, '..', '..', '..', 'dev.db'),
];
const DB_PATH = possiblePaths.find((p) => {
    try {
        require('fs').statSync(p);
        return true;
    }
    catch {
        return false;
    }
}) ?? possiblePaths[0];
const logger = new common_1.Logger('PrismaService');
logger.log(`Connecting to database at: ${DB_PATH}`);
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({ url: `file:${DB_PATH}` });
const prismaInstance = new client_1.PrismaClient({ adapter });
let PrismaService = class PrismaService {
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map