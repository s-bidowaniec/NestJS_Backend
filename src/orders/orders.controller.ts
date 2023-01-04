import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {CreateOrderDTO} from "./dtos/create-order.dto";
import {UpdateOrderDTO} from "./dtos/update-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    @Get('/')
    getAllOrders(){
        return this.ordersService.getAll();
    };
    @Get('/:id')
    getOrderById(@Param('id', new ParseUUIDPipe()) id: string){
        return this.ordersService.getById(id);
    };
    @Delete('/:id')
    deleteById(@Param('id', new ParseUUIDPipe()) id: string){
        return this.ordersService.deleteById(id);
    };
    @Post('/')
    createOrder(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.createOrder(orderData)
    };
    @Put('/:id')
    updateOrder(@Param('id', new ParseUUIDPipe()) id: string, @Body() orderData: UpdateOrderDTO){
        return this.ordersService.updateById(id, orderData);
    }
}
