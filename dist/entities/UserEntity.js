"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
/** 教材カテゴリーエンティティ */
class UserEntity extends Entity_1.default {
    static factory(properties) {
        const allProperties = Object.assign({ from: '' }, properties);
        return new UserEntity(allProperties);
    }
    static _factoryWithAllProperties(properties) {
        return new UserEntity(properties);
    }
    get id() {
        if (this.properties.id === undefined) {
            // IDがなければまだ永続化されていない
            throw new Error('UserEntity: not in repository');
        }
        return this.properties.id;
    }
    get name() {
        return this.properties.name;
    }
    get email() {
        return this.properties.email;
    }
    get password() {
        return this.properties.password;
    }
    get birthday() {
        if (this.properties.birthday)
            return this.properties.birthday;
    }
    get from() {
        return this.properties.from;
    }
    get status() {
        return this.properties.status;
    }
    get createdAt() {
        return this.properties.createdAt;
    }
    get updatedAt() {
        return this.properties.updatedAt;
    }
}
exports.default = UserEntity;
