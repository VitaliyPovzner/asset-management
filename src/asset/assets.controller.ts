import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto, UpdateAssetDto, FilterAssetDto } from '@/asset/dto/index';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @UsePipes(new ValidationPipe({
    transform: true
  }))
  async create(@Body() createAssetDto: CreateAssetDto) {
    try {
      const createdAsset = await this.assetsService.create(createAssetDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Asset created successfully',
        data: createdAsset,
      };
    } catch (error) {
      throw new HttpException('Failed to create asset', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const assets = await this.assetsService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Assets retrieved successfully',
        data: assets,
      };
    } catch (error) {
      throw new HttpException('Failed to retrieve assets', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('filter')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFilteredAssets(@Query() filterAssetDto: FilterAssetDto) {
    try {
      const assets = await this.assetsService.findByFilters(filterAssetDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Assets retrieved successfully',
        data: assets,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve filtered assets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

 
  @Put(':id')
  @UsePipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: false, 
    transform: true, 
    skipMissingProperties: false,
  }))
  async update(@Param('id') id: number, @Body() updateAssetDto: UpdateAssetDto) {
    try {
      const updatedAsset = await this.assetsService.update(id, updateAssetDto);
      if (!updatedAsset) {
        throw new HttpException('Asset not found', HttpStatus.NOT_FOUND);
      }
      return updatedAsset;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.assetsService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Asset deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to delete asset', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
