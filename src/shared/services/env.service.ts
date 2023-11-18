import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isNil } from 'lodash'
import {
  AllConfigType,
  AppConfig,
  AppleConfig,
  AuthConfig,
  DatabaseConfig,
  FacebookConfig,
  FileConfig,
  GoogleConfig,
  MailConfig,
  ThrottleConfig,
  TwitterConfig,
} from 'src/config/env-config/config.type'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  get appConfig(): AppConfig {
    return this.configService.getOrThrow('app', { infer: true })
  }

  get isDevelopment(): boolean {
    return this.appConfig.nodeEnv === 'development'
  }

  get isProduction(): boolean {
    return this.appConfig.nodeEnv === 'production'
  }

  get isTest(): boolean {
    return this.appConfig.nodeEnv === 'test'
  }

  get appleConfig(): AppleConfig {
    return this.configService.getOrThrow('apple', { infer: true })
  }

  get authConfig(): AuthConfig {
    return this.configService.getOrThrow('auth', { infer: true })
  }

  get databaseConfig(): DatabaseConfig {
    return this.configService.getOrThrow('database', { infer: true })
  }

  get facebookConfig(): FacebookConfig {
    return this.configService.getOrThrow('facebook', { infer: true })
  }

  get fileConfig(): FileConfig {
    return this.configService.getOrThrow('file', { infer: true })
  }

  get googleConfig(): GoogleConfig {
    return this.configService.getOrThrow('google', { infer: true })
  }

  get mailConfig(): MailConfig {
    return this.configService.getOrThrow('mail', { infer: true })
  }

  get throttleConfig(): ThrottleConfig {
    return this.configService.getOrThrow('throttle', { infer: true })
  }

  get twitterConfig(): TwitterConfig {
    return this.configService.getOrThrow('twitter', { infer: true })
  }

  private get(key: any): string {
    const value = this.configService.getOrThrow(key, { infer: true })

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set') // probably we should call process.exit() too to avoid locking the service
    }

    return value
  }
}
