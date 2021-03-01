import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateFeatureDto } from "./dto/create-feature.dto";
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

    async inertMany(items: CreateFeatureDto[]): Promise<Feature[]> {
        return this.featureModel.insertMany(items);
    }

    async findAll(): Promise<Feature[]> {
        return this.featureModel.find().exec();
    }
}