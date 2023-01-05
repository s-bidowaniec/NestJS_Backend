import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  };
  public async getById(id: Product["id"]): Promise<Product | void> {
    const currentProduct: Product | null = await this.prismaService.product.findUnique({where: { id }});
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      return currentProduct;
    }
  };
  public async deleteById(id: Product["id"]): Promise<object | void> {
    const currentProduct: Product | null = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      await this.prismaService.product.delete({where: { id }});
      return { success: true };
    }
  };
  public async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<object | void> {
    await this.prismaService.product.create({
      data: productData,
    });
    return { success: true };
  };
  public async updateById(id: Product['id'], productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<object | void> {
    const currentProduct: Product | null = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      await this.prismaService.product.update({
        where: { id },
        data: productData,
      });
      return { success: true };
    }
  }
  // Extended
  public getAllExtended(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  };
  public async getExtendedById(id: Product['id']): Promise<Product | null> {
    const currentProduct: Product | null = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      return this.prismaService.product.findUnique({
        where: {id},
        include: {orders: true},
      });
    }
  }
}
