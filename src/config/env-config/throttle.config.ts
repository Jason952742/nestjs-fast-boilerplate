import { registerAs } from '@nestjs/config'
import { ThrottleConfig } from './config.type'
import validateConfig from '../../utils/validate-config'
import { IsInt, Max, Min } from 'class-validator'

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @Max(65535)
  THROTTLE_TTL: number

  @IsInt()
  @Min(0)
  @Max(65535)
  THROTTLE_LIMIT: number
}

export default registerAs<ThrottleConfig>('throttle', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    throttleTtl: process.env.THROTTLE_TTL ? parseInt(process.env.THROTTLE_TTL) : 60,
    throttleLimit: process.env.THROTTLE_LIMIT ? parseInt(process.env.THROTTLE_LIMIT) : 10,
  }
})
