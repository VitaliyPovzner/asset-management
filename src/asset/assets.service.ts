import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto, FilterAssetDto } from '@/asset/dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, MoreThan } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { S3Service } from '../s3/s3.service';


@Injectable()
export class AssetsService {
  private readonly bucketName = 'asset-managment';

  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const asset = this.assetsRepository.create(createAssetDto);
    return this.assetsRepository.save(asset);
  }

  async findAll(): Promise<Asset[]> {
    const assets = await this.assetsRepository.find();
    const fileName = `findAll_${new Date().toISOString()}.json`;
    this.s3Service
    .writeDataToS3(assets, fileName, this.bucketName)
    .then(() => {
      console.log('Successfully saved to s3');
    })
    .catch((error) => {
      console.log(`Failed to save to s3`, error);
    });
    return assets
  }

  

  async findByFilters(filterAssetDto: FilterAssetDto): Promise<Asset[]> {
    const options: FindManyOptions<Asset> = {
      where: {},
    };
    const { id, updatedAfter } = filterAssetDto;

    if (id) {
      options.where = { ...options.where, id };
    }

    if (updatedAfter) {
      options.where = { ...options.where, updatedAt: MoreThan(updatedAfter) };
    }

    const assets = await this.assetsRepository.find(options);
    const fileName = `findByFilters_${new Date().toISOString()}.json`;
    this.s3Service
      .writeDataToS3(assets, fileName, this.bucketName)
      .then(() => {
        console.log('Successfully saved to s3');
      })
      .catch((error) => {
        console.log(`Failed to save to s3`, error);
      });

    return assets;
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.assetsRepository.findOne({ where: { id } });

    if (!asset) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
    const updatedAsset = this.assetsRepository.merge(asset, updateAssetDto);

    return await this.assetsRepository.save(updatedAsset);
  }

  async remove(id: string): Promise<void> {
    const result = await this.assetsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
  }


}
