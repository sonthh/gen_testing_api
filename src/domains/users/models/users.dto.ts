import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export const status = ['INACTIVE', 'ACTIVE'];

export const role = ['DOCTOR', 'PATIENT', 'ADMIN'];

export const sortBy = ['_id', 'fullname', 'createdBy', 'createdAt'];

export const sortDirection = ['ASC', 'DESC'];
export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @ApiPropertyOptional()
  @IsEnum(status)
  readonly status?: string;

  @ApiPropertyOptional()
  @IsEnum(role)
  readonly role?: string;
}

export class FindManyDto {
  @IsNumberString()
  @IsOptional()
  readonly limit?: string = '10';

  @IsEnum(sortBy)
  @IsOptional()
  readonly sortBy?: string = '_id';

  @IsEnum(sortDirection)
  @IsOptional()
  readonly sortDirection?: string = 'ASC';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly cursor?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly fullname?: string;

  @IsEnum(role)
  @IsOptional()
  readonly role?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  readonly fullname?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  readonly password?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber?: string;

  @ApiPropertyOptional()
  @IsEnum(status)
  readonly status?: string;

  @ApiPropertyOptional()
  @IsEnum(role)
  readonly role?: string;
}
