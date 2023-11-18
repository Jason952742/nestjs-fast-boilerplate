import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserService } from './user.service'
import { IUserData } from './user.interface'
import { EnvService } from '../../shared/services/env.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private envService: EnvService,
  ) {}

  async use(req: Request & { user?: IUserData & { id?: number } }, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1]
      const decoded: any = jwt.verify(token, this.envService.authConfig.secret)
      const user = await this.userService.findById(decoded.id)

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED)
      }

      req.user = user.user
      req.user.id = decoded.id
      next()
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED)
    }
  }
}
