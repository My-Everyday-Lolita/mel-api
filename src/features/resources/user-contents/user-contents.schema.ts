import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MSchema } from "mongoose";

export type UserContentDocument = UserContent & Document;

@Schema()
export class UserContent {
    @Prop({ type: [raw({ id: String, wantToSell: { type: Boolean, required: false } })], default: [] })
    closet: any[];

    @Prop({ type: [raw({ id: String })], default: [] })
    wishlist: any[];

    @Prop({
        type: [raw({
            id: String,
            title: String,
            theme: { type: String, default: null },
            event: { type: String, default: null },
            place: { type: String, default: null },
            date: String,
            fields: [MSchema.Types.Mixed]
        })], default: []
    })
    coordinations: any[];

    @Prop()
    user: string;

    @Prop({ required: true })
    modified: number;
}

export const UserContentSchema = SchemaFactory.createForClass(UserContent);
