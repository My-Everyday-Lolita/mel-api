import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Brand, BrandSchema } from "./brands/brand.schema";
import { BrandsController } from "./brands/brands.controller";
import { BrandsService } from "./brands/brands.service";
import { jsonSchema as brandjc } from "./brands/dto/create-brand.dto";
import { CategoriesController } from "./categories/categories.controller";
import { CategoriesService } from "./categories/categories.service";
import { Category, CategorySchema } from "./categories/category.schema";
import { jsonSchema as categoryjc } from "./categories/dto/create-category.dto";
import { ResourcesController } from "./resources.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Brand.name, schema: BrandSchema },
        ])
    ],
    controllers: [
        CategoriesController,
        BrandsController,
        ResourcesController,
    ],
    providers: [
        CategoriesService,
        BrandsService,
        { provide: 'APP_SCHEMAS', useValue: [brandjc, categoryjc] }
    ]
})
export class ResourcesModule { }