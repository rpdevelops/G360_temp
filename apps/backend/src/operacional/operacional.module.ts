import { Module } from '@nestjs/common';
import { OperacionalService } from './operacional.service';
import { OperacionalController } from './operacional.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OperacionalController],
  providers: [OperacionalService],
})
export class OperacionalModule {}
