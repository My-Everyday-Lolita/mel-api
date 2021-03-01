import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
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

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['edit-feature', 'admin'])
    create(@Body() data: CreateFeatureDto): Promise<Feature> {
        return this.featuresService.create(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateFeatureDto[]): Promise<Feature[]> {
        return this.featuresService.inertMany(data);
    }

}