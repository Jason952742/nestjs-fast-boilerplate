import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs'

import { ArticleModule } from './modules/article/article.module'
import { ProfileModule } from './modules/profile/profile.module'
import { TagModule } from './modules/tag/tag.module'
import { UserModule } from './modules/user/user.module'
import mikroOrmConfig from './config/mikro-orm.config'
import { SharedModule } from './shared/shared.module'
import { ConfigModule } from '@nestjs/config'
import envConfig from './config/env.config'
import { I18nModule } from 'nestjs-i18n'
import i18Config from './config/i18.config'
import { HomeModule } from './modules/home/home.module'

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(envConfig),
    MikroOrmModule.forRootAsync(mikroOrmConfig),
    I18nModule.forRootAsync(i18Config),
    HomeModule,
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule,
  ],
  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up()
  }

  // for some reason, the auth middlewares in profile and article modules are fired before the request context one, so they would fail to access contextual EM.
  // by registering the middleware directly in AppModule, we can get around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*')
  }
}
