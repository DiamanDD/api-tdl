import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

function getEnvFilePath(): string {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '.env.development';
    case 'test':
      return '.env.test';
    case 'production':
      return '.env.production';
    default:
      return '.env';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
