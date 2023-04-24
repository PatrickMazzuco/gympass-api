import { ClientError } from '@/common/errors/client.error';

export class InvalidParamsError extends ClientError {
  constructor(content: any) {
    super('Invalid params');
    this.name = this.constructor.name;
    this.content = content;
  }
}
