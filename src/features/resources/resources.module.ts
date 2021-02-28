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
import { FeaturesController } from "./features/features.controller";
import { FeaturesService } from "./features/features.service";
import { jsonSchema as featurejc } from "./features/dto/create-feature.dto";
import { ResourcesController } from "./resources.controller";
import { Feature, FeatureSchema } from "./features/feature.schema";
import { Color, ColorSchema } from "./colors/color.schema";
import { ColorsController } from "./colors/colors.controller";
import { ColorsService } from "./colors/colors.service";
import { jsonSchema as colorjc } from "./colors/dto/create-color.dto";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Feature.name, schema: FeatureSchema },
            { name: Color.name, schema: ColorSchema },
        ])
    ],
    controllers: [
        CategoriesController,
        BrandsController,
        FeaturesController,
        ColorsController,
        ResourcesController,
    ],
    providers: [
        CategoriesService,
        BrandsService,
        FeaturesService,
        ColorsService,
        { provide: 'APP_SCHEMAS', useValue: [brandjc, categoryjc, featurejc, colorjc] }
    ]
})
export class ResourcesModule { }