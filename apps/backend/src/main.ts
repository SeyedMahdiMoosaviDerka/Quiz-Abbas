import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { setupSwagger } from './configs/swagger/swagger-config';
import { seedDatabase } from './common/utils/seed';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  const port = configService.get<number>('PORT', 3000);
  const dbSeed = configService.get<boolean>('SEED_DB', false);

  if (dbSeed) {
    try {
      const dataSource = app.get('DataSource');
      await seedDatabase(dataSource);
      logger.log('Database seeded successfully');
    } catch (error) {
      logger.error('Database seeding failed', error);
      process.exit(1);
    }
  }

  await app.listen(port);
  logger.log(
    `🚀 Application running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap().catch((err) => {
  Logger.error('Application failed to start', err.stack);
  process.exit(1);
});
