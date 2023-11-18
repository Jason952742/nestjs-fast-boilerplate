import { NestFactory, Reflector, repl } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { useContainer } from 'class-validator'
import { SharedModule } from './shared/shared.module'
import { EnvService } from './shared/services/env.service'
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common'
import validationOptions from './utils/validation-options'
import fastifyCsrf from '@fastify/csrf-protection'
import helmet from '@fastify/helmet'
import compression from '@fastify/compress'

async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // can still get information behind a reverse proxy
      trustProxy: true,
    }),
    { bufferLogs: true, rawBody: true },
  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const envConfigService = app.select(SharedModule).get(EnvService)

  app.enableCors()
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  })
  await app.register(fastifyCsrf)
  await app.register(compression, { encodings: ['gzip', 'deflate'] })

  app.setGlobalPrefix(envConfigService.appConfig.apiPrefix, {
    exclude: ['/'],
  })
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.useGlobalPipes(new ValidationPipe(validationOptions))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // enable docs
  if (envConfigService.isDevelopment) {
    const options = new DocumentBuilder()
      .setTitle('NestJS Fast Boilerplate API')
      .setDescription('The Fast Boilerplate API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/docs', app, document)
  }

  if (envConfigService.isDevelopment) {
    app.enableShutdownHooks()
    await repl(AppModule)
  }

  const port = envConfigService.appConfig.port
  await app.listen(port, '0.0.0.0')
  console.info(`server running on ${await app.getUrl()}`)

  return app
}

void bootstrap()
  .then((app) => {
    console.log(app.getHttpServer().address())
  })
  .catch((err) => {
    console.log(err)
  })
