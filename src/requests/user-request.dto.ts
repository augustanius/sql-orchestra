import { Expose } from 'class-transformer';
export class cmdDto {
  type: string;
  data?: any;
  cmd?: any;
}

export class RequestDto {
  type: string;

  @Expose({ name: 'cmd_chain' })
  cmdChain: cmdDto[];
}

export class UserRequestDto {
  id: Uuid;
  username: string;
  city: string;
  friend?: number;

  constructor(userRequest: Array<any>) {
    this.id = userRequest[0];
    this.username = userRequest[1];
    this.city = userRequest[2];
    this.friend = userRequest[3];
  }
}
