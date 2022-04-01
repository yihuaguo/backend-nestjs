import { IsString } from 'class-validator';

export class IndexDot {
  @IsString()
  name: string;
}

export default {
  IndexDot,
};
