import {Controller, Delete, Get, Param, Post, Body, Put, NotFoundException} from '@nestjs/common';
import {ParseUUIDPipe} from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import {UpdateProductDTO} from "./dtos/update-product.dto";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
    @Get('/')
    getAll(): any {
        return this.productsService.getAll();
        };
    @Get('/:id')
    getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const currentProd = this.productsService.getById(id);
        if (!currentProd) {
            throw new NotFoundException('Product not found');
        } else {
            return currentProd;
        }
    };
    @Delete('/:id')
    deleteById(@Param('id', new ParseUUIDPipe()) id: string){
        if (!this.productsService.getById(id)) {
            throw new NotFoundException('Product not found');
        } else {
            return this.productsService.deleteById(id);
            return { success: true };
        }
    };
    @Post('/')
    create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }
    @Put('/:id')
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() productData: UpdateProductDTO){
        if (!this.productsService.getById(id))
            throw new NotFoundException('Product not found');

        this.productsService.updateById(id, productData);
        return { success: true }
        }
}
