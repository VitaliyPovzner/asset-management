import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './database/database.config';
import * as path from 'path';
import { DatabaseModule } from './database/database.module';
import { AssetsModule } from './asset/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env'),
      isGlobal: true,
    }),
    DatabaseConfigModule,
    DatabaseModule,
    AssetsModule,
  ],
})
export class AppModule {}
