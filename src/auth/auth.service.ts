import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtToken } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async decodeJWT(token): Promise<any> {
    const jwt = token.split(' ')[1];
    if (jwt) {
      const token = await this.jwtService.verifyAsync(jwt, {
        secret: jwtToken.privateKey,
      });
      if (token.access) {
        return token.user_id;
      }
    } else {
      throw new Error('Error on Token');
    }
  }
}
