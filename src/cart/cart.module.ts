import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  // imports:[AuthGuard],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
