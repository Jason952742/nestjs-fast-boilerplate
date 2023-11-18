import path from 'path'
import { HeaderResolver } from 'nestjs-i18n'
import { I18nAsyncOptions } from 'nestjs-i18n/dist/interfaces/i18n-options.interface'
import { EnvService } from '../shared/services/env.service'
import { SharedModule } from '../shared/shared.module'

const i18Config: I18nAsyncOptions = {
  imports: [SharedModule],
  inject: [EnvService],
  useFactory: (envService: EnvService) => ({
    fallbackLanguage: envService.appConfig.fallbackLanguage,
    loaderOptions: { path: path.join(__dirname, '../i18n/'), watch: true },
  }),
  resolvers: [
    {
      use: HeaderResolver,
      useFactory: (envService: EnvService) => {
        return [envService.appConfig.headerLanguage]
      },
      inject: [EnvService],
    },
  ],
}

export default i18Config
