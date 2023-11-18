import { LoadStrategy } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Migrator } from '@mikro-orm/migrations'
import { EntityGenerator } from '@mikro-orm/entity-generator'
import { SeedManager } from '@mikro-orm/seeder'
import { MySqlDriver } from '@mikro-orm/mysql'
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs/typings'
import { SharedModule } from '../shared/shared.module'
import { EnvService } from '../shared/services/env.service'

const mikroOrmConfig: MikroOrmModuleAsyncOptions = {
  imports: [SharedModule],
  inject: [EnvService],
  useFactory: (envService: EnvService) => ({
    driver: MySqlDriver,
    host: envService.databaseConfig.host,
    port: envService.databaseConfig.port,
    user: envService.databaseConfig.username,
    password: envService.databaseConfig.password,
    dbName: envService.databaseConfig.name,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: true,
    loadStrategy: LoadStrategy.JOINED,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    registerRequestContext: false,
    extensions: [Migrator, EntityGenerator, SeedManager],
  }),
}

export default mikroOrmConfig
