import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ColorDocument = Color & Document;

@Schema()
export class Color {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    hex: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
