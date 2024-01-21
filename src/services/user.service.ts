import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ErrorException } from 'src/exceptions/error.exception';
import { UserRequestDto, cmdDto } from 'src/requests/user-request.dto';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  private userRepository: Repository<UserEntity>;
  constructor(
    @InjectRepository(UserEntity)
    repo: Repository<UserEntity>,
  ) {
    this.userRepository = repo;
  }

  @Transactional()
  async insert(requests: cmdDto[]) {
    const users = [];
    for (const cmd of requests) {
      let req = null;
      if (!cmd.data) {
        if (!cmd.cmd) {
          continue;
        }
        req = cmd.cmd;
      } else {
        req = cmd.data;
      }

      if (!req) {
        throw new Error('request invalid');
      }

      const userRequest = new UserRequestDto(req);
      const data = await this.internalInsert(userRequest);
      if (data.status) {
        throw new ErrorException(HttpStatus.CONFLICT, data.user);
      }
      users.push(data);
    }

    return users;
  }

  private async internalInsert(userRequest: UserRequestDto): Promise<any> {
    let user = await this.userRepository.findOne({
      where: { username: userRequest.username },
    });
    if (user) {
      return { status: 409, user };
    } else {
      user = this.userRepository.create(userRequest);
      user = await this.userRepository.save(user);
    }

    return user;
  }
}
