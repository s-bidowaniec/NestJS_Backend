import {Injectable, NotFoundException} from '@nestjs/common';
import {db, Order} from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
    public getAll(): Order[]{
        return db.orders;
    };
    public getById(id:Order['id']): Order | void{
        const currentOrder = db.orders.find(order => order.id === id);
        if (!currentOrder) {
            throw new NotFoundException('Order not found');
        } else {
            return currentOrder;
        }
    };
    public deleteById(id:Order['id']): object | void {
        const currentOrder = db.orders.find(order => order.id === id);
        if (!currentOrder) {
            throw new NotFoundException('Order not found');
        } else {
            const currentIndex = db.orders.indexOf(currentOrder);
            db.orders.splice(currentIndex, 1);
            return {'success': true}
        }
    };
    public createOrder(orderData: Omit<Order, 'id'>): Order {
        const newOrder = { ...orderData, id: uuidv4() };
        db.orders.push(newOrder);
        return newOrder;
    };
    public updateById(id:Order['id'], orderData: Omit<Order, 'id'>): object | void {
        const currentOrder = db.orders.find(order => order.id === id);
        if (!currentOrder) {
            throw new NotFoundException('Order not found');
        } else {
            db.orders = db.orders.map(order => {if(order.id === id){
                return {id, ...orderData}
            } else {
                return order
            }
        })
        return {'success': true}
        }
    }
}
