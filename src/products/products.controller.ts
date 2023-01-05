import {Controller, Delete, Get, Param, Post, Body, Put} from '@nestjs/common';
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
        return this.productsService.getById(id);
    };
    @Delete('/:id')
    deleteById(@Param('id', new ParseUUIDPipe()) id: string){
        return this.productsService.deleteById(id);
    };
    @Post('/')
    createProduct(@Body() productData: CreateProductDTO) {
        return this.productsService.createProduct(productData);
    }
    @Put('/:id')
    updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() productData: UpdateProductDTO){
        return this.productsService.updateById(id, productData);
        }
    // Extended
    @Get('/extended')
    getAllExtended(): any {
        return this.productsService.getAllExtended();
    }
    @Get('/extended/:id')
    getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
        return  this.productsService.getExtendedById(id);
    }
}
