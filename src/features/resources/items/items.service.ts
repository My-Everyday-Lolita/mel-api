import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { Item, ItemDocument } from "./item.schema";

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>
    ) {
        // this.create({
        //     brand: {
        //         name: 'Lorem',
        //     },
        //     collectionn: 'dolor sit amet',
        //     category: [
        //         { name: 'Dresses' },
        //         { name: 'Jumperskirts' },
        //     ],
        //     variants: [
        //         {
        //             colors: [
        //                 { name: 'Pink' },
        //                 { name: 'Black' },
        //             ]
        //         }
        //     ]
        // }).then(console.log).catch(console.error);
        // this.findAll().then(console.log).catch(console.error);
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async inertMany(items: CreateItemDto[]): Promise<Item[]> {
        return this.itemModel.insertMany(items);
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }
}