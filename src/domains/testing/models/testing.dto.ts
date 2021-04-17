import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export const sortBy = ['_id', 'createdBy', 'createdAt'];

export const sortDirection = ['ASC', 'DESC'];

export class SubTesting {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  readonly numberGen: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  readonly gen: string[];
}

export class CreateTestingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsArray()
  @IsObject({ each: true })
  readonly results: SubTesting[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly patient: string;
}

export class FindManyDto {
  @IsNumberString()
  @IsOptional()
  readonly limit?: string;

  @IsEnum(sortBy)
  @IsOptional()
  readonly sortBy?: string = '_id';

  @IsEnum(sortDirection)
  @IsOptional()
  readonly sortDirection?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly cursor?: string;
}

export class UpdateTestingDto {
  @ApiPropertyOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsObject({ each: true })
  @IsOptional()
  readonly result?: SubTesting[];
}
