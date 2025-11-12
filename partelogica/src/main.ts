import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extras
      transform: true, // Transforma tipos automáticamente
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Reservas de Espacios')
    .setDescription(
      'API REST para gestión de reservas de salas, aulas y espacios de coworking',
    )
    .setVersion('1.0')
    .addTag('Autenticación', 'Endpoints de registro y login')
    .addTag('Roles', 'Gestión de roles de usuario')
    .addTag('Usuarios', 'Gestión de usuarios')
    .addTag('Tipos de Espacio', 'Categorías de espacios')
    .addTag('Espacios', 'Gestión de salas y espacios')
    .addTag('Equipos', 'Equipamiento de espacios')
    .addTag('Horarios', 'Gestión de horarios disponibles')
    .addTag('Reservas', 'Sistema de reservas')
    .addTag('Incidencias', 'Reporte y gestión de incidencias')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'API Docs - Sistema Reservas',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  🚀 Aplicación iniciada en: http://localhost:${port}
  📚 Documentación Swagger: http://localhost:${port}/api/docs
  `);
}
bootstrap();