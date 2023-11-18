import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import jwt from 'jsonwebtoken'

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  // if the route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers?.authorization ? (req.headers.authorization as string).split(' ') : null

  if (token?.[1]) {
    // todo: change SECRET
    const decoded: any = jwt.verify(token[1], 'secret')
    return !!data ? decoded[data] : decoded.user
  }
})
