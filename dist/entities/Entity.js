"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** エンティティのベースクラス */
class Entity {
    constructor(properties) {
        this.properties = properties;
    }
    /**
     * エンティティが永続化されているか？
     * ※IDがオートインクリメントの場合の実装。
     */
    persisted() {
        return this.properties.id !== undefined;
    }
    /** エンティティのプロパティを取得 */
    getProperties() {
        return this.properties;
    }
}
exports.default = Entity;
