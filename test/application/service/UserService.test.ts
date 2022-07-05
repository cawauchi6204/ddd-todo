import UserEntity from '../../../src/entity/UserEntity';
import * as UserService from '../../../src/application/service/UserService';
import UserStatus from '../../../src/domain/User/UserStatus';

describe('Enroll', () => {
    it('Entityからユーザーを生成することができる', async () => {
        const entity = UserEntity.factory({
            name: 'any',
            email: 'any@example.com',
            password: 'any',
            status: UserStatus.ENABLE.value,
        });
        const actual = await UserService.enrollUser(entity);
        console.log('UserService.testの18行目のactualは' + JSON.stringify(actual, null, 2));
    });
});
