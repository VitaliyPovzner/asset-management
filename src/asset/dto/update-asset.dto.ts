import { IsMACAddress, IsIP, IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAssetDto {
  @IsMACAddress()
  @IsOptional() 
  mac?: string;

  @IsIP()
  @IsOptional() 
  ip?: string;

  @IsString()
  @IsOptional() 
  name?: string;

  @IsOptional() 
  @IsDate()
  @Type(() => Date) 
  lastInternetAccess?: Date;
}
