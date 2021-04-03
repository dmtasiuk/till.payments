import { IsEmail, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCustomerDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(3)
  @MaxLength(255)
  @Transform(({ value }: {value: string}): string => value.trim())
  firstName: string;

  @MinLength(3)
  @MaxLength(255)
  @Transform(({ value }: {value: string}): string => value.trim())
  lastName: string;

  @IsUUID()
  merchantId: string;
}
