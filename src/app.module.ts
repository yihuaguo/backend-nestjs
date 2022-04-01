import { Module } from '@nestjs/common';
import { IndexModule, UserModule } from './modules';

@Module({
  imports: [IndexModule, UserModule],
})
export class AppModule {}
