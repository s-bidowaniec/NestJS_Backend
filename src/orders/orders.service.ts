import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }
  public async getById(id: Order['id']): Promise<Order | void> {
    const currentOrder: Order | null =
      await this.prismaService.order.findUnique({
        where: { id },
        include: {
          product: true,
          client: true,
        },
      });
    if (!currentOrder) {
      throw new NotFoundException('Order not found');
    } else {
      return currentOrder;
    }
  }
  public async deleteById(id: Order['id']): Promise<object | void> {
    const currentOrder: Order | null =
      await this.prismaService.order.findUnique({ where: { id } });
    if (!currentOrder) {
      throw new NotFoundException('Order not found');
    } else {
      await this.prismaService.order.delete({ where: { id } });
      return { success: true };
    }
  }
  public async createOrder(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<object | void> {
    const { productId, clientId, ...otherData } = orderData;
    try {
      await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
      return { success: true };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("Product doesn't exist");
      } else {
        throw error;
      }
    }
  }
  public async updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<object | void> {
    const currentOrder: Order | null =
      await this.prismaService.order.findUnique({ where: { id } });
    if (!currentOrder) {
      throw new NotFoundException('Order not found');
    } else {
      const { productId, clientId, ...otherData } = orderData;
      await this.prismaService.order.update({
        where: { id },
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
      return { success: true };
    }
  }
}
