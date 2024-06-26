import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UsersDogs } from './users-dogs.entity';
import { UsersDogsRepository } from './users-dogs.repository';

@Injectable()
export class UsersDogsService {
    constructor(private readonly usersDogsRepository: UsersDogsRepository) {}

    async create(entityData: UsersDogs) {
        const userDog = new UsersDogs(entityData);
        return this.usersDogsRepository.create(userDog);
    }

    async find(where: FindOptionsWhere<UsersDogs>) {
        return this.usersDogsRepository.find({ where });
    }

    async findOne(where: FindOptionsWhere<UsersDogs>) {
        return this.usersDogsRepository.findOne(where);
    }

    async update(where: FindOptionsWhere<UsersDogs>, partialEntity: QueryDeepPartialEntity<UsersDogs>) {
        return this.usersDogsRepository.update(where, partialEntity);
    }

    async delete(where: FindOptionsWhere<UsersDogs>) {
        return this.usersDogsRepository.delete(where);
    }
}
