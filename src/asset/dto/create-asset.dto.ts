import { IsMACAddress, IsIP, IsString, IsOptional, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateAssetDto {
  @IsMACAddress()
  @IsNotEmpty()
  mac: string;

  @IsIP()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  lastInternetAccess?: Date;
}
