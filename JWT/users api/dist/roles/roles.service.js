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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../entities/role.entity");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(createRoleDto) {
        const role = this.roleRepository.create({ name: createRoleDto.name, permissions: createRoleDto.permissions.map(p => { return { id: p }; }) });
        await this.roleRepository.save(role);
        return role;
    }
    async findAll() {
        return this.roleRepository.find({ relations: ['permissions'] });
    }
    async findOne(id) {
        return this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
    }
    async update(id, updateRoleDto) {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!role) {
            throw new Error('Rol no encontrado');
        }
        if (updateRoleDto.name) {
            role.name = updateRoleDto.name;
        }
        if (updateRoleDto.permissions) {
            role.permissions = updateRoleDto.permissions.map(pid => ({ id: pid }));
        }
        await this.roleRepository.save(role);
        return this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
    }
    async remove(id) {
        await this.roleRepository.delete(id);
        return { deleted: true };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map