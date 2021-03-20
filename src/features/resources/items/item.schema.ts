import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { Document } from "mongoose";
import { Brand } from "../brands/brand.schema";
import { Category } from "../categories/category.schema";
import { Color } from "../colors/color.schema";
import { Feature } from "../features/feature.schema";

export type ItemDocument = Item & Document;

export class ItemVariant {
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Color)
    colors: [Color];

    @IsNotEmpty()
    photo: string;
}

@Schema()
export class Item {
    @Prop()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Brand)
    brand: Brand;

    @Prop()
    collectionn: string;

    @Prop()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Category)
    category: Category;

    @Prop()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Feature)
    features: [Feature];

    @Prop()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ItemVariant)
    variants: [ItemVariant];

    @Prop()
    @IsOptional()
    year: number;

    @Prop()
    @IsOptional()
    japanese: string;

    @Prop()
    @IsOptional()
    measurments: string;

    @Prop()
    @IsOptional()
    estimatedPrice: number;

    @Prop()
    @IsOptional()
    keywords: [string];

    @Prop()
    @IsOptional()
    substyles: [string];

    @Prop({ required: true })
    @IsUUID()
    owner: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.index({
    'brand.name': 'text',
    'brand.shortname': 'text',
    collectionn: 'text',
    year: 'text',
    japanese: 'text',
    measurments: 'text',
    estimatedPrice: 'text',
    keywords: 'text',
    'features.name': 'text',
    'category.name': 'text',
    'category.shortname': 'text',
    'category.parent.name': 'text',
    'category.parent.shortname': 'text',
    'category.parent.parent.name': 'text',
    'category.parent.parent.shortname': 'text',
});
