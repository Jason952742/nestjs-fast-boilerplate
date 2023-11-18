import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UsePipes } from '@nestjs/common'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto'
import { User } from './user.decorator'
import { IUserRO } from './user.interface'
import { UserService } from './user.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<IUserRO> {
    return this.userService.findByEmail(email)
  }

  @Put('user')
  async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return this.userService.update(userId, userData)
  }

  @Post('users')
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData)
  }

  @Delete('users/:slug')
  async delete(@Param() params: any): Promise<any> {
    return this.userService.delete(params.slug)
  }

  @Post('users/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto)

    const errors = { User: ' not found' }
    if (!foundUser) {
      throw new HttpException({ errors }, 401)
    }
    const token = this.userService.generateJWT(foundUser)
    const { email, username, bio, image } = foundUser
    const user = { email, token, username, bio, image }
    return { user }
  }
}
