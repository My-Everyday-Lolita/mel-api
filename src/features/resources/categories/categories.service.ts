import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./category.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
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

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async inertMany(items: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryModel.insertMany(items);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }
}