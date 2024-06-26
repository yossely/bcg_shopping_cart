interface BCGBaseException<T> {
  code: string;
  message: string;
  data: T;
}
