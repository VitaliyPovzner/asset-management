import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset } from './entities/asset.entity';
import { S3Module } from '@/s3/s3.module';
@Module({
  imports: [TypeOrmModule.forFeature([Asset]), S3Module],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
