import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dogs } from '../dogs/dogs.entity';
import { Role } from './user-roles.enum';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nickname: string;

    @Column()
    email: string;

    @Column({ name: 'profile_image' })
    profileImage: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User,
    })
    role: Role;

    @ManyToOne(() => Dogs)
    @JoinColumn({ name: 'main_dog_id' })
    mainDog: Dogs;

    @Column({ name: 'main_dog_id', nullable: true })
    mainDogId: number | null;

    @Column({ name: 'oauth_id', unique: true })
    oauthId: string;

    @Column({ name: 'oauth_access_token' })
    oauthAccessToken: string;

    @Column({ name: 'oauth_refresh_token' })
    oauthRefreshToken: string;

    @Column({ name: 'refresh_token' })
    refreshToken: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(entityData: Partial<Users>) {
        Object.assign(this, entityData);
    }
}
