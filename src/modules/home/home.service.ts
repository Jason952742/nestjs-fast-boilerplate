import { Injectable } from '@nestjs/common'
import { EnvService } from 'src/shared/services/env.service'

@Injectable()
export class HomeService {
  constructor(private envService: EnvService) {}

  appInfo() {
    return { name: this.envService.appConfig.name }
  }
}
