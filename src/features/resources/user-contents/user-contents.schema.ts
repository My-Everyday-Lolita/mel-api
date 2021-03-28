import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserContentDocument = UserContent & Document;

@Schema()
export class UserContent {
    @Prop({ type: [raw({ id: String, wantToSell: { type: Boolean, required: false } })], default: [] })
    closet: any[];

    @Prop({ type: [raw({ id: String })], default: [] })
    wishlist: any[];

    @Prop({
        type: [raw({
            title: String,
            theme: String,
            event: String,
            place: String,
            date: Date,
            fields: [{
                type: String,
                value: { id: String }
            }]
        })], default: []
    })
    coordinations: any[];

    @Prop()
    user: string;

    @Prop({ required: true })
    modified: number;
}

export const UserContentSchema = SchemaFactory.createForClass(UserContent);
