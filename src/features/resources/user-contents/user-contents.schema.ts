import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserContentDocument = UserContent & Document;

@Schema()
export class UserContent {
    @Prop({ type: [raw({ id: String, wantToSell: { type: Boolean, required: false } })], default: [] })
    closet: any[];

    @Prop({ type: [raw({ id: String, wantToSell: { type: Boolean, required: false } })], default: [] })
    wishlist: any[];

    @Prop()
    user: string;

    @Prop({ required: true })
    modified: number;
}

export const UserContentSchema = SchemaFactory.createForClass(UserContent);
