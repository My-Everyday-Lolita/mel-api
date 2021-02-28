import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Category } from "../categories/category.schema";

export type FeatureDocument = Feature & Document;

@Schema()
export class Feature {
    @Prop({ required: true })
    name: string;

    @Prop()
    categories: [Category]
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
