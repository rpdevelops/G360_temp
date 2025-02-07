import { Module } from '@nestjs/common';
import { CommonsController } from './controllers/commons.controller';
import { LdapService } from './services/ldap/ldap.service';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task], 'dbseiConnection'),],
  controllers: [CommonsController, TaskController],
  providers: [LdapService, TaskService],
})
export class CommonsModule {}
