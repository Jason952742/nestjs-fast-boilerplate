import { ConfigModuleOptions } from '@nestjs/config'
import databaseConfig from './env-config/database.config'
import authConfig from './env-config/auth.config'
import appConfig from './env-config/app.config'
import mailConfig from './env-config/mail.config'
import fileConfig from './env-config/file.config'
import facebookConfig from './env-config/facebook.config'
import googleConfig from './env-config/google.config'
import twitterConfig from './env-config/twitter.config'
import appleConfig from './env-config/apple.config'

const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig, facebookConfig, googleConfig, twitterConfig, appleConfig],
  envFilePath: ['.env'],
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
}

export default envConfig
