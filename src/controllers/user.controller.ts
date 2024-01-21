import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorException } from 'src/exceptions/error.exception';
import { RequestDto } from 'src/requests/user-request.dto';
import { ResponseDto } from 'src/responses/response.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post(['addMultiple'])
  async addMultiple(
    @Body(new ValidationPipe({ transform: true }))
    request: RequestDto,
  ) {
    try {
      const data = await this.userService.insert(request.cmdChain);
      return new ResponseDto(HttpStatus.OK, data);
    } catch (error_) {
      if (error_ instanceof ErrorException) {
        return new ResponseDto(error_.status, error_.data);
      }

      throw error_;
    }
  }
}
