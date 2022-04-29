/** TodoStatus */
export default class TodoStatus {
    private static readonly _instances: TodoStatus[] = [];
    private static readonly _valueToInstanceMap = new Map<number, TodoStatus>();

    public static readonly DISABLE = new TodoStatus(0, '無効', 'invalid');
    public static readonly ENABLE = new TodoStatus(1, '有効', 'valid');

    private constructor(public readonly value: number, public readonly jpName: string, public readonly enName: string) {
        TodoStatus._instances.push(this);
        TodoStatus._valueToInstanceMap.set(this.value, this);
    }

    static get list(): TodoStatus[] {
        return TodoStatus._instances;
    }

    static fromValue(value: number): TodoStatus {
        const instance = TodoStatus._valueToInstanceMap.get(value);
        if (!instance) {
            throw new Error(`TodoStatus: ${value} is invalid`);
        }
        return instance;
    }
}
