import { ErrorToken } from '../enums/errors/error-name.enum';
import { ErrorType } from '../enums/errors/error-type.enum';

export class BaseError extends Error {
  private _token: ErrorToken;
  private _type: ErrorType;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this._token = ErrorToken.DEFAULT;
    this._type = ErrorType.UNEXPECTED_ERROR;
  }

  get token(): ErrorToken {
    return this._token;
  }

  set token(value: ErrorToken) {
    this._token = value;
  }

  get type(): ErrorType {
    return this._type;
  }

  set type(value: ErrorType) {
    this._type = value;
  }
}
