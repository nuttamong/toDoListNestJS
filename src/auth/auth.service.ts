import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmailForSignIn(email)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = user.toObject()
      return {
        email: result.email,
        userId: result._id
      }
    }
    return null
  }

  async login(user: any){
    const payload = { email: user.email, sub: user.userId }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
