import { Module,Global  } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtToken } from '../config/config'

@Global()
@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: jwtToken.privateKey,
      // signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
