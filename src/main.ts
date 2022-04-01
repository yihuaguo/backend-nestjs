import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from 'src/config/nest';
var moment = require('moment');

async function App() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(
    `服务启动 - 端口：${PORT}, 时间：${moment().format('YYYY/M/D - h:mm:ss')}`,
  );
}

App();
