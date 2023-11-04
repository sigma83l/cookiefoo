import { Controller,
         Get,
         Post,
         Patch,
         Delete,         
} from '@nestjs/common';

@Controller('products')
export class ProductController {
    async getAll() {

    }

}
import { 
    Injectable,
    Get,
    Post,
    Patch,
    Delete
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prodduct } from '@prisma/client'

@Injectable()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    async getProducts():  {

    }

    async getProductById(productId: )
}