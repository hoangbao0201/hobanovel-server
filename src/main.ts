import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    await app.listen(process.env.PORT || 4000);
}
bootstrap();
