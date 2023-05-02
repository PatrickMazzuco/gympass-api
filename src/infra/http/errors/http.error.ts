export class HTTPError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly validationErrors?: Record<string, string[]>,
  ) {
    super(message);
  }
}
