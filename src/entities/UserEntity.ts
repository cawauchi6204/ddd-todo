import Entity from './Entity'

/** エンティティ作成時の必須プロパティ一覧 */
export interface UserPropertiesEssential {
	name: string
	email: string
	password: string
	status: number
	createdAt: Date
	updatedAt: Date
}

/** 自動生成されるものを含めた、エンティティを保持する際に必要なプロパティ一覧 */
export interface UserProperties extends UserPropertiesEssential {
	id?: number
	from: string
	birthday?: Date
}

/** 全てのプロパティ一覧 */
export interface UserPropertiesAll extends UserProperties {
	id: number // IDも必須にする
}

/** ユーザーエンティティ */
export default class UserEntity extends Entity<UserProperties> {
	static factory(properties: UserPropertiesEssential): UserEntity {
		const allProperties: UserProperties = {
			from: '',
			...properties,
		}
		return new UserEntity(allProperties)
	}
	static _factoryWithAllProperties(
		properties: UserPropertiesAll
	): UserEntity {
		return new UserEntity(properties)
	}

	get id(): number {
		if (this.properties.id === undefined) {
			// IDがなければまだ永続化されていない
			throw new Error('UserEntity: not in repository')
		}
		return this.properties.id
	}
	get name(): string {
		return this.properties.name
	}
	get email(): string {
		return this.properties.email
	}
	get password(): string {
		return this.properties.password
	}
	get birthday(): Date | undefined {
		if (this.properties.birthday) return this.properties.birthday
	}
	get from(): string {
		return this.properties.from
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
