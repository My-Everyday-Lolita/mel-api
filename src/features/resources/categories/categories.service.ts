import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./category.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async update(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoryModel.findById(updateCategoryDto._id);
        category.name = updateCategoryDto.name;
        category.shortname = updateCategoryDto.shortname;
        category.children = updateCategoryDto.children as any;
        return category.save();
    }

    async insertMany(items: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryModel.insertMany(items);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }
}