import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(port?: number) {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todolist API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addTag('example')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addSecurityRequirements('JWT-auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  // app.useGlobalFilters(new DomainExceptionFilter());
  await app.listen(port ?? 4000);

  return { app };
}

if (require.main === module) {
  bootstrap();
}

export { bootstrap };
