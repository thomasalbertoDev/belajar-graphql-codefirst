import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import * as config from 'src/configs/environment.config';
import { AppModule } from './app/app.module';
import { logger } from './configs/logger.config';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => config] }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
      {
        ttl: 3600,
        limit: 1000,
      },
      {
        ttl: 86400,
        limit: 10000,
      },
    ]),
    WinstonModule.forRoot(logger),
    AppModule,
    DatabaseModule,
    GraphqlModule,
  ],
  providers: [],
})
export class MainModule {}
