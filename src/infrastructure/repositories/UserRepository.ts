import Sequelize from 'sequelize'
import { sequelize } from './Repository'
import UserEntity from '../../entities/UserEntity'

const FILE_NAME = 'UserRepository.ts'

/** 論理データ→物理データのマッピング情報 */
export const Fields = {
	id: 'id',
	name: 'name',
	email: 'email',
	password: 'password',
	from: 'from',
	birthday: 'birthday',
	status: 'status',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
} as const

/** ORMから取得されるデータ情報（論理データ）*/
interface Attributes {
	id?: number
	name: string
	email: string
	password: string
	from: string
	birthday?: Date
	status: number
	createdAt: Date
	updatedAt: Date
}

/** DB内のカラム情報（物理データ）*/
interface Instance extends Sequelize.Model, Attributes {
	[Fields.id]: number
	[Fields.name]: string
	[Fields.email]: string
	[Fields.password]: string
	[Fields.from]: string
	[Fields.birthday]: Date
	[Fields.status]: number
	[Fields.createdAt]: Date
	[Fields.updatedAt]: Date
}

/** findOneなどが正しい型を使う為の静的モデル */
type ModelStatic = typeof Sequelize.Model & {
	new (values?: object, options?: Sequelize.BuildOptions): Instance
}

/** DBとインスタンスを仲介する */
const Model = sequelize.define(
	'users', // テーブル名
	{
		// カラム情報
		id: {
			field: Fields.id,
			type: Sequelize.BIGINT({ length: 20 }).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			field: Fields.name,
			type: Sequelize.DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			field: Fields.email,
			type: Sequelize.DataTypes.STRING({ length: 255 }),
			allowNull: false,
		},
		password: {
			field: Fields.password,
			type: Sequelize.DataTypes.STRING({ length: 255 }),
			allowNull: false,
		},
		birthday: {
			field: Fields.birthday,
			type: Sequelize.DataTypes.DATE,
			allowNull: false,
		},
		from: {
			field: Fields.from,
			type: Sequelize.DataTypes.STRING(100),
			allowNull: false,
		},
		status: {
			field: Fields.status,
			type: Sequelize.DataTypes.TINYINT({ length: 3 }).UNSIGNED,
			allowNull: false,
			defaultValue: 1,
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
) as ModelStatic

/** 主キー指定でエンティティを取得(型変換関数を渡すことでエンティティの派生型も取得可能) */
export async function findEntityByPk<Output = UserEntity>(
	pk: number,
	toType: (e: UserEntity) => Output = (e: UserEntity) =>
		e as unknown as Output
): Promise<Output> {
	throw new Error('要実装')
}

/** 条件指定で複数エンティティを取得(型変換関数を渡すことでエンティティの派生型も取得可能) */
export async function findEntitiesBy<Output = UserEntity>(
	condition: Condition,
	toType: (e: UserEntity) => Output = (e: UserEntity) =>
		e as unknown as Output
): Promise<Output[]> {
	const instances = await Model.findAll(condition.options)
	return instances.map((i) => toType(Converter.toEntity(i)))
}

/** 条件指定で複数エンティティ+合計件数を取得(型変換関数を渡すことでエンティティの派生型も取得可能) ※ページネーション用 */
export async function findAndCountEntitiesBy<Output = UserEntity>(
	condition: Condition,
	toType: (e: UserEntity) => Output = (e: UserEntity) =>
		e as unknown as Output
): Promise<Output[]> {
	throw new Error('要実装')
}

/** エンティティを保存(UPSERT) */
export async function saveEntity(entity: UserEntity): Promise<UserEntity> {
	const model = Converter.toInstance(entity)
	const instance = await model.save()
	if (!entity.persisted()) {
		const properties = entity.getProperties()
		if (instance.id === undefined) {
			throw new Error(`${FILE_NAME}: ID is not defined`)
		}
		properties.id = instance.id
	}
	return Converter.toEntity(instance)
}

/** find系関数の検索条件を集約するクラス */
export class Condition {
	// TODO: ScheduleRepositoryと似たような実装(ビルダーパターン)に置き換える。
	constructor(public readonly options: Sequelize.FindOptions) {}

	static all(): Condition {
		return new Condition({ limit: 9999 })
	}

	static enabled(): Condition {
		const wheres: any = {}
		wheres.status = {
			[Sequelize.Op.eq]: 1, // 有効なstatusの値
		}
		return new Condition({
			where: wheres,
			order: [['id', 'ASC']],
			limit: 9999,
		})
	}

	static parentCategoryId(
		parentCategoryId: number,
		status: number
	): Condition {
		const wheres: Record<string, any> = {}
		wheres.parentCategoryId = {
			[Sequelize.Op.eq]: parentCategoryId,
		}
		wheres.status = {
			[Sequelize.Op.eq]: 1, // 有効なstatus値
		}
		return new Condition({
			where: wheres,
			order: [['id', 'ASC']],
			limit: 9999,
		})
	}
}

/** @private リポジトリ内部だけで利用したい型変換関数郡 */
class Converter {
	/** entity -> ORMのインスタンスへ変換 */
	static toInstance(entity: UserEntity): Instance {
		// BULK INSERTに対応できるよう、正味の型変換はtoRecord()内で行う
		return Model.build(this.toRecord(entity) as any, {
			isNewRecord: !entity.persisted(),
		})
	}

	/** entity -> ORM内部型(Attributes)へ変換 */
	static toRecord(entity: UserEntity): Attributes {
		const record: Attributes = {
			name: entity.name,
			email: entity.email,
			password: entity.password,
			birthday: entity.birthday,
			from: entity.from,
			status: entity.status,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		}
		if (entity.persisted()) {
			record.id = entity.id
		}
		return record
	}
	/** ORM内部型 -> entityへ変換 */
	static toEntity(instance: Instance): UserEntity {
		if (instance.id === undefined) {
			throw new Error(`${FILE_NAME}: ID is not defined`)
		}
		return UserEntity._factoryWithAllProperties({
			id: instance.id,
			name: instance.name,
			email: instance.email,
			password: instance.password,
			birthday: instance.birthday,
			from: instance.from,
			status: instance.status,
			createdAt: instance.createdAt,
			updatedAt: instance.updatedAt,
		})
	}
}
