import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
//import { db, Product } from '../db';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  };
  public async getById(id: Product["id"]): Promise<Product | void> {
    const currentProduct: Product | null = await this.prismaService.product.findUnique({
      where: { id },
    });
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
      await this.prismaService.product.delete({
        where: { id },
      });
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
}
