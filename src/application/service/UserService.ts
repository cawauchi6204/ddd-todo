import * as UserRepository from '../../infrastructure/repository/UserRepository';
import UserEntity from '../../entity/UserEntity';

export async function enrollUser(entity: UserEntity): Promise<UserEntity> {
    return await UserRepository.saveEntity(entity);
}
