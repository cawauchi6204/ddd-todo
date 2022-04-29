import TodoEntity from '../../src/entities/TodoEntity';
import TodoStatus from '../../src/domain/todo/TodoStatus';

{
    describe('factory()', () => {
        testFactory();
    });
    describe('_factoryWithAllProperties()', () => {
        testFactoryWithAllProperties();
    });
}

function testFactory() {
    it('factoryメソッドで作成されたEntityにはidがないため参照するとエラーを起こす', async () => {
        const entity = TodoEntity.factory({
            status: TodoStatus.ENABLE.value,
            userId: 1,
            title: 'hoge',
            description: 'hoge',
            createdAt: new Date(2016),
            updatedAt: new Date(2018),
        });
        expect(() => {
            return entity.id;
        }).toThrow();
    });
}

function testFactoryWithAllProperties() {
    it('');
}
