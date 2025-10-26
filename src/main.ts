import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: {
        // ✅ gt: greater than (page > 1)
        gt: (a, b) => a > b,

        // ✅ lt: less than (page < totalPages)
        lt: (a, b) => a < b,

        // ✅ eq: equal (a == b)
        eq: (a, b) => a === b,

        // ✅ inc: 증가
        inc: (value) => Number(value) + 1,

        // ✅ dec: 감소
        dec: (value) => Number(value) - 1,
      },
    }),
  );

  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(3000);
}
bootstrap();
