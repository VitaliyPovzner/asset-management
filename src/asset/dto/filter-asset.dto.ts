import { IsOptional, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterAssetDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number | undefined;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAfter?: Date | undefined;
}
