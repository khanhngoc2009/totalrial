import { laughValue } from 'src/maper.module';
import { User } from './entities/user.entities';
import { UserDtoResponse } from './user.dto';
export class UserTranfromer {
  changeUser(user: User): UserDtoResponse {
    const response: UserDtoResponse = laughValue({
      dto: UserDtoResponse,
      entites: User,
      value: user,
    });

    return {
      ...response,
      full_name: `${user.first_name + user.last_name}`,
    };
  }
}
