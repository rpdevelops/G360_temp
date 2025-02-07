import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperacionalModule } from './operacional/operacional.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CommonsModule } from './commons/commons.module';
import { Task } from './commons/entities/task.entity';

@Module({
  imports: [
    OperacionalModule,
    ConfigModule.forRoot({
    envFilePath: ['.env.development.db','.env.development.ad'],
    load: [configuration],
  }),
      // Database (PROTHEUS)
  TypeOrmModule.forRootAsync({
    name: 'protheusConnection',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mssql',
      host: configService.get('protheus.host'),
      port: +configService.get('protheus.port'),
      username: configService.get('protheus.user'),
      password: configService.get('protheus.password'),
      database: configService.get('protheus.db'),
      options: {trustServerCertificate: true},
      entities: [],
      //ATENÇÃO: JAMAIS COLOQUE ESSE PARAMETRO ABAIXO COMO TRUE PARA O PROTHEUS PRINCIPALMENTE EM PRODUÇÃO, RISCO DE PERDA DE DADOS!!!!
      synchronize: false, //SEMPRE COMO FALSE. (SÓ SOBE COMO TRUE SE FOR UM BANCO NOVO E FOR SUBIR A APLICAÇÃO PELA PRIMEIRA VEZ PARA CRIAR AS ENTIDADES)
    }),
    // dataSource receives the configured DataSourceOptions
    // and returns a Promise<DataSource>.
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
  }),
    // Database Postgres (DBSEI)
    TypeOrmModule.forRootAsync({
      name: 'dbseiConnection', // A unique name for the second connection
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('dbsei.host'),
        port: +configService.get('dbsei.port'),
        username: configService.get('dbsei.user'),
        password: configService.get('dbsei.password'),
        database: configService.get('dbsei.db'),
        options: { trustServerCertificate: true },
        entities: [Task], 
        //ATENÇÃO: JAMAIS COLOQUE ESSE PARAMETRO ABAIXO COMO TRUE PARA AMBIENTE DE PRODUÇÃO, RISCO DE PERDA DE DADOS!!!!
        synchronize: false, //SEMPRE COMO FALSE. (SÓ SOBE COMO TRUE SE FOR UM BANCO NOVO E FOR SUBIR A APLICAÇÃO PELA PRIMEIRA VEZ PARA CRIAR AS ENTIDADES)
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  CommonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
