import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Color, ColorDocument } from "./color.schema";
import { CreateColorDto } from "./dto/create-color.dto";

@Injectable()
export class ColorsService {
    constructor(
        @InjectModel(Color.name) private colorModel: Model<ColorDocument>
    ) { }

    async create(createColorDto: CreateColorDto): Promise<Color> {
        const createdCategory = new this.colorModel(createColorDto);
        return createdCategory.save();
    }

    async inertMany(items: CreateColorDto[]): Promise<Color[]> {
        return this.colorModel.insertMany(items);
    }

    async findAll(): Promise<Color[]> {
        return this.colorModel.find().exec();
    }
}