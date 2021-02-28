import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { Feature } from "./feature.schema";
import { FeaturesService } from "./features.service";

@Controller('api/resources/features')
export class FeaturesController {

    constructor(
        private featuresService: FeaturesService
    ) { }

    @Get()
    findAll(): Promise<Feature[]> {
        return this.featuresService.findAll();
    }

    @Post('import')
    insertMany(@Body() data: CreateFeatureDto[]): Promise<Feature[]> {
        return this.featuresService.inertMany(data);
    }

}