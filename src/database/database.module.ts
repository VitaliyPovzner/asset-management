import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './database.config';

@Module({
  imports: [DatabaseConfigModule],
})
export class DatabaseModule {}
