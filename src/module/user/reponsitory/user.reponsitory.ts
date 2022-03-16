import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entities';

@EntityRepository(User)
export class UserReponsitory extends Repository<User> {}
