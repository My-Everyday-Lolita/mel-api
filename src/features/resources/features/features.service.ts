import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../categories/category.schema";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { Feature, FeatureDocument } from "./feature.schema";

@Injectable()
export class FeaturesService {
    constructor(
        @InjectModel(Feature.name) private featureModel: Model<FeatureDocument>
    ) { }

    async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
        const createdFeature = new this.featureModel(createFeatureDto);
        return createdFeature.save();
    }

    async update(updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
        const feature = await this.featureModel.findById(updateFeatureDto._id);
        feature.name = updateFeatureDto.name;
        feature.categories = updateFeatureDto.categories as any;
        return feature.save();
    }

    async insertMany(items: CreateFeatureDto[]): Promise<Feature[]> {
        return this.featureModel.insertMany(items);
    }

    async findAll(): Promise<Feature[]> {
        return this.featureModel.find().exec();
    }
}