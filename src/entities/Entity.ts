interface BaseProperties {
  id?: any;
}

/** エンティティのベースクラス */
export default class Entity<T extends BaseProperties> {
  protected properties: T;

  protected constructor(properties: T) {
      this.properties = properties;
  }

  /**
   * エンティティが永続化されているか？
   * ※IDがオートインクリメントの場合の実装。
   */
  persisted(): boolean {
      return this.properties.id !== undefined;
  }

  /** エンティティのプロパティを取得 */
  getProperties(): T {
      return this.properties;
  }
}
