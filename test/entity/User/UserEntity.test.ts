import UserEntity from '../../../src/entity/UserEntity';
import UserStatus from '../../../src/domain/User/UserStatus';

{
    describe('factory()', testFactory);
}

function testFactory() {
    it('UserEntityを生成する', async () => {
        const entity = UserEntity.factory({
            name: 'any',
            email: 'any@example.com',
            password: 'any',
            status: UserStatus.ENABLE.value,
        });
        const actual = UserEntity.factory(entity);
        expect(actual.name).toBe('any');
    });
}
