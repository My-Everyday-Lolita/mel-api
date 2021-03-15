import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand, BrandDocument } from "./brand.schema";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>
    ) { }

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        const createdBrand = new this.brandModel(createBrandDto);
        return createdBrand.save();
    }

    async inertMany(items: CreateBrandDto[]): Promise<Brand[]> {
        return this.brandModel.insertMany(items);
    }

    async findAll(): Promise<Brand[]> {
        return this.brandModel.find().exec();
    }
}