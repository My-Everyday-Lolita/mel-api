import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand, BrandDocument } from "./brand.schema";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>
    ) {
        // this.create({
        //     name: 'Lorem', children: [
        //         {
        //             name: 'Ipsum', children: [
        //                 { name: 'Dolor', shortname: 'D' },
        //                 { name: 'Sit' },
        //                 { name: 'Amet' },
        //             ]
        //         }
        //     ]
        // }).then(console.log).catch(console.error);
        // this.findAll().then(console.log).catch(console.error);
    }

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