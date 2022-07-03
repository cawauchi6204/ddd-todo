/** UserStatus */
export default class UserStatus {
    private static readonly _instances: UserStatus[] = [];
    private static readonly _valueToInstanceMap = new Map<number, UserStatus>();

    public static readonly DISABLE = new UserStatus(0, '無効', 'invalid');
    public static readonly ENABLE = new UserStatus(1, '有効', 'valid');

    private constructor(public readonly value: number, public readonly jpName: string, public readonly enName: string) {
        UserStatus._instances.push(this);
        UserStatus._valueToInstanceMap.set(this.value, this);
    }

    static get list(): UserStatus[] {
        return UserStatus._instances;
    }

    static fromValue(value: number): UserStatus {
        const instance = UserStatus._valueToInstanceMap.get(value);
        if (!instance) {
            throw new Error(`UserStatus: ${value} is invalid`);
        }
        return instance;
    }
}
