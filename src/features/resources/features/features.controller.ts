import { Body, Controller, Get, Patch, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
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

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['create-feature', 'admin'])
    create(@Body() data: CreateFeatureDto): Promise<Feature> {
        return this.featuresService.create(data);
    }

    @Patch()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['edit-feature', 'admin'])
    update(@Body() data: UpdateFeatureDto): Promise<Feature> {
        return this.featuresService.update(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateFeatureDto[]): Promise<Feature[]> {
        return this.featuresService.insertMany(data);
    }

}