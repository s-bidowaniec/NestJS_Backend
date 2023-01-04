import {Injectable, NotFoundException} from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  };
  public getById(id: Product["id"]): Product | void {
    const currentProduct = db.products.find(product => product.id === id);
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      return currentProduct;
    }
  };
  public deleteById(id: Product["id"]): object | void {
    const currentProduct: Product = db.products.find(product => product.id === id);
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      const currentIndex: number = db.products.indexOf(currentProduct);
      db.products.splice(currentIndex, 1);
      return { success: true };
    }
  };
  public createProduct(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  };
  public updateById(id: Product['id'], productData: Omit<Product, 'id'>): object | void {
    const currentProduct: Product = db.products.find(product => product.id === id);
    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    } else {
      db.products = db.products.map((p) => {
        if (p.id === id) {
          return {...p, ...productData};
        }
        return p;
      });
      return { success: true };
    }
  }
}
