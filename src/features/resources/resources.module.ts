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
import { ItemsService } from "./items/items.service";
import { Item, ItemSchema } from "./items/item.schema";
import { ItemsController } from "./items/items.controller";
import { jsonSchema as itemjc } from "./items/dto/create-item.dto";
import { KeycloakModule } from "../keycloak/keycloak.module";
import { UserContent, UserContentSchema } from "./user-contents/user-contents.schema";
import { UserContentsController } from "./user-contents/user-contents.controller";
import { UserContentsService } from "./user-contents/user-contents.service";
import { jsonSchema as usercontentjc } from "./user-contents/dto/create-user-content.dto";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Feature.name, schema: FeatureSchema },
            { name: Color.name, schema: ColorSchema },
            { name: Item.name, schema: ItemSchema },
            { name: UserContent.name, schema: UserContentSchema },
        ]),
        KeycloakModule,
    ],
    controllers: [
        CategoriesController,
        BrandsController,
        FeaturesController,
        ColorsController,
        ItemsController,
        UserContentsController,
        ResourcesController,
    ],
    providers: [
        CategoriesService,
        BrandsService,
        FeaturesService,
        ColorsService,
        ItemsService,
        UserContentsService,
        { provide: 'APP_SCHEMAS', useValue: [brandjc, categoryjc, featurejc, colorjc, itemjc, usercontentjc] }
    ]
})
export class ResourcesModule { }