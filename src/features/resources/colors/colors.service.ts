import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Color, ColorDocument } from "./color.schema";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";

@Injectable()
export class ColorsService {
    constructor(
        @InjectModel(Color.name) private colorModel: Model<ColorDocument>
    ) { }

    async create(createColorDto: CreateColorDto): Promise<Color> {
        const createdColor = new this.colorModel(createColorDto);
        return createdColor.save();
    }

    async update(updateColorDto: UpdateColorDto): Promise<Color> {
        const color = await this.colorModel.findById(updateColorDto._id);
        color.name = updateColorDto.name;
        color.hex = updateColorDto.hex;
        return color.save();
    }

    async insertMany(items: CreateColorDto[]): Promise<Color[]> {
        return this.colorModel.insertMany(items);
    }

    async findAll(): Promise<Color[]> {
        return this.colorModel.find().exec();
    }
}