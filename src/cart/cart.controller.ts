import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthService } from 'src/auth/auth.service';
import { Message } from 'src/config/config';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
  ) {}

  @Post('/create')
  async createCart(@Headers() headers) {
    let id = await this.authService.decodeJWT(headers.authorization);
    if (id) {
      return this.cartService.create(id);
    }
  }

  @Post('/add')
  async addProduct(
    @Body('product_id') productId: string,
    @Body('quantity') quantity: number,
    @Headers() headers,
  ) {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.addProduct(id, productId, quantity);
  }

  @Patch('/update')
  async updateProduct(
    @Headers() headers,
    @Body('product_id') productId: string,
    @Body('quantity') quantity: number,
  ) {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.updateProduct(id, productId, quantity);
  }

  @Delete('/remove')
  async removeProduct(
    @Headers() headers,
    @Body('product_id') productId: string,
  ) {
    let id = await this.authService.decodeJWT(headers.authorization);
    this.cartService.removeProduct(id, productId);
  }

  @Delete('/destroy')
  async destroyCart(@Headers() headers) {
    let id = await this.authService.decodeJWT(headers.authorization);
    this.cartService.destroy(id);
  }

  @Get(':product_id/has')
  async checkIfProductInCart(
    @Param('product_id') product_id: string,
    @Headers() headers,
  ): Promise<boolean> {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.has(id, product_id);
  }

  @Get('/isEmpty')
  async checkIfCartIsEmpty(@Headers() headers): Promise<boolean> {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.isEmpty(id);
  }

  @Get('/count')
  async displayItemList(@Headers() headers): Promise<any> {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.count(id);
  }

  @Get('/quantity')
  async getNumberOfItems(@Headers() headers): Promise<number> {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.quantity(id);
  }

  @Get('/total')
  async getTotalItems(@Headers() headers): Promise<number> {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.total(id);
  }

  @Post('/discount')
  async addDiscount(
    @Body('name') name: string,
    @Body('type') type: any,
    @Body('amount') amount: any,
    @Body('max') max: any,
    @Headers() headers,
  ) {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.addDiscount(id, name, type, amount, max);
  }

  @Delete('/discount')
  async removeDiscount(@Body('name') name: string, @Headers() headers) {
    let id = await this.authService.decodeJWT(headers.authorization);
    this.cartService.removeDiscount(id, name);
  }

  @Get('/totalWithPrice')
  async getTotal(@Headers() headers): Promise<number | Message> {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.totalWithPrice(id);
  }

  @Post('/addFreebie')
  async addFreebie(
    @Body('name') name: string,
    @Body('condition') condition: any,
    @Body('reward') reward: any,
    @Headers() headers
  ) {
    let id = await this.authService.decodeJWT(headers.authorization);
    return this.cartService.addFreebie(id, name, condition, reward);
  }
}
