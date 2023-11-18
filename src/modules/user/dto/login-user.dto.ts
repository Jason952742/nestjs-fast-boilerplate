import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer'

export class LoginUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  readonly email: string

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string
}
