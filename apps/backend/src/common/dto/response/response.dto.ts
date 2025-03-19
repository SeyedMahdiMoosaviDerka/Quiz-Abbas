export class ResponseDto<T> {
  constructor(
    public statusCode: number,
    public data: T,
    public message: string,
    public error?: string
  ) {}
}
