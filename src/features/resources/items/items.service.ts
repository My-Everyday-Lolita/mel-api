import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Feature } from "../features/feature.schema";
import { CreateItemDto } from "./dto/create-item.dto";
import { Criterium } from "./dto/criterium.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item, ItemDocument, ItemVariant } from "./item.schema";

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>
    ) { }

    async findById(id: string): Promise<Item> {
        return this.itemModel.findById(id);
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        createItemDto.created = new Date();
        createItemDto.modified = new Date();
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async update(updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.itemModel.findById(updateItemDto._id);
        item.brand = updateItemDto.brand;
        item.category = updateItemDto.category;
        item.collectionn = updateItemDto.collectionn;
        item.features = updateItemDto.features as [Feature];
        item.variants = updateItemDto.variants as [ItemVariant];
        item.keywords = updateItemDto.keywords as [string];
        item.substyles = updateItemDto.substyles as [string];
        item.japanese = updateItemDto.japanese;
        item.year = updateItemDto.year;
        item.measurments = updateItemDto.measurments;
        item.estimatedPrice = updateItemDto.estimatedPrice;
        item.modified = new Date();
        return item.save();
    }

    async insertMany(items: CreateItemDto[]): Promise<Item[]> {
        return this.itemModel.insertMany(items);
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async findByCriteria(criteria: Criterium[], skip: number, limit = 20): Promise<Item[]> {
        const filter = {
            $and: []
        };
        const brands = criteria.filter(crit => crit.type === 'brand');
        if (brands.length > 0) {
            filter.$and.push({
                'brand.name': { $in: brands.map(crit => crit.value) }
            });
        }
        const categories = criteria.filter(crit => crit.type === 'category');
        if (categories.length > 0) {
            const categoryNames = categories.map(crit => crit.value);
            const $categoryOr = [];
            $categoryOr.push({
                'category.name': { $in: categoryNames }
            });
            $categoryOr.push({
                'category.parent.name': { $in: categoryNames }
            });
            $categoryOr.push({
                'category.parent.parent.name': { $in: categoryNames }
            });
            filter.$and.push({ $or: $categoryOr })
        }
        const colors = criteria.filter(crit => crit.type === 'color');
        if (colors.length > 0) {
            filter.$and.push({
                'variants.colors.name': { $all: colors.map(crit => crit.value) }
            });
        }
        const features = criteria.filter(crit => crit.type === 'feature');
        if (features.length > 0) {
            filter.$and.push({
                'features.name': { $all: features.map(crit => crit.value) }
            });
        }
        const keywords = criteria.filter(crit => crit.type === 'keyword');
        if (keywords.length > 0) {
            filter.$and.push({
                $text: { $search: keywords.map(crit => crit.value).join(' ') }
            });
        }
        const own = criteria.filter(crit => crit.type === 'own');
        if (own.length > 0) {
            const email = own[0].value;
            filter.$and.push({
                owner: email
            });
        }
        const byIds = criteria.filter(crit => crit.type === 'id');
        if (byIds.length > 0) {
            filter.$and.push({
                _id: { $in: byIds.map(crit => crit.value) }
            });
        }

        if (filter.$and.length === 0) {
            delete filter.$and;
        }
        return this.itemModel.find(filter).limit(Math.min(limit, 500)).skip(skip).exec();
    }

    async recentlyAdded(): Promise<Item[]> {
        return this.itemModel.find().sort({ created: -1 }).limit(4).exec();
    }
}