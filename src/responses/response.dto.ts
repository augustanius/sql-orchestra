import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  status: string;
  dbState: any;

  constructor(status: HttpStatus, data: any) {
    this.status =
      status >= HttpStatus.OK && status < HttpStatus.AMBIGUOUS ? 'ok' : 'error';
    this.dbState = data;
  }
}
