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
exports.CreateCharacterDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const toNumber = (value) => Number(value);
const toAbilities = (value) => {
    if (Array.isArray(value)) {
        return value.map((item) => String(item));
    }
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
                return parsed.map((item) => String(item));
            }
        }
        catch {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter((item) => item.length > 0);
        }
    }
    return [];
};
class CreateCharacterDto {
    name;
    class;
    race;
    strength;
    dexterity;
    intelligence;
    vitality;
    abilities;
    imageUrl;
}
exports.CreateCharacterDto = CreateCharacterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCharacterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCharacterDto.prototype, "class", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCharacterDto.prototype, "race", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateCharacterDto.prototype, "strength", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateCharacterDto.prototype, "dexterity", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateCharacterDto.prototype, "intelligence", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateCharacterDto.prototype, "vitality", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => toAbilities(value)),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCharacterDto.prototype, "abilities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCharacterDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=create-character.dto.js.map