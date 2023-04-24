import { ErrorType } from '../enums/errors/error-type.enum';

export class BaseError extends Error {
  private _type: ErrorType;
  private _content: any[] | null;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this._type = ErrorType.UNEXPECTED_ERROR;
    this._content = null;
  }

  get type(): ErrorType {
    return this._type;
  }

  set type(value: ErrorType) {
    this._type = value;
  }

  get content(): any[] | null {
    return this._content ? this._content : null;
  }

  set content(value: any[] | null) {
    this._content = value;
  }
}
