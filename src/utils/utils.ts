import { HttpException } from '@nestjs/common';

// 错误异常捕获
export const throwErr = (msg: string, code: number) => {
  throw new HttpException(msg, code);
};

export default {
  throwErr,
};
