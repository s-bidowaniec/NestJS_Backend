import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}
    public getAll(): Promise<Order[]>{
        return this.prismaService.order.findMany();
    };
    public async getById(id:Order['id']): Promise<Order | void>{
        const currentOrder: Order | null = await this.prismaService.order.findUnique({where:{id}});
        if (!currentOrder) {
            throw new NotFoundException('Order not found');
        } else {
            return currentOrder;
        }
    };
    public async deleteById(id:Order['id']): Promise<object | void> {
        const currentOrder: Order | null = await this.prismaService.order.findUnique({where:{id}});
        if (!currentOrder) {
            throw new NotFoundException('Order not found');
        } else {
            await this.prismaService.order.delete({where:{id}});
            return {'success': true}
        }
    };
    public async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<object | void> {
        await this.prismaService.order.create({data:orderData});
        return {'success': true};
    };
    public async updateById(id:Order['id'], orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<object | void> {
        const currentOrder: Order | null = await this.prismaService.order.findUnique({where:{id}});
        if (!currentOrder) {
            throw new NotFoundException('Order not found');
        } else {
            await this.prismaService.order.update({where:{id}, data:orderData});
            return {'success': true};
        }
    }
}
