import Entity from './Entity'

/** エンティティ作成時の必須プロパティ一覧 */
export interface TodoPropertiesEssential {
	userId: number
  title: string
  description: string
  status: number
	createdAt: Date
	updatedAt: Date
}

/** 自動生成されるものを含めた、エンティティを保持する際に必要なプロパティ一覧 */
export interface TodoProperties extends TodoPropertiesEssential {
	id?: number
}

/** 全てのプロパティ一覧 */
export interface TodoPropertiesAll extends TodoProperties {
	id: number // IDも必須にする
}

/** ユーザーエンティティ */
export default class TodoEntity extends Entity<TodoProperties> {
	static factory(properties: TodoPropertiesEssential): TodoEntity {
		const allProperties: TodoProperties = {
			...properties,
		}
		return new TodoEntity(allProperties)
	}
	static _factoryWithAllProperties(
		properties: TodoPropertiesAll
	): TodoEntity {
		return new TodoEntity(properties)
	}

	get id(): number {
		if (this.properties.id === undefined) {
			// IDがなければまだ永続化されていない
			throw new Error('TodoEntity: not in repository')
		}
		return this.properties.id
	}
	get title(): string {
		return this.properties.title
	}
	get description(): string {
		return this.properties.description
	}
	get status(): number {
		return this.properties.status
	}
	get createdAt(): Date {
		return this.properties.createdAt
	}
	get updatedAt(): Date {
		return this.properties.updatedAt
	}
}
