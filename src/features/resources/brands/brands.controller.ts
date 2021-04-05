import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
import { Brand } from "./brand.schema";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Controller('api/resources/brands')
export class BrandsController {

    constructor(
        private brandsService: BrandsService
    ) { }

    @Get()
    findAll(): Promise<Brand[]> {
        return this.brandsService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['create-brand', 'admin'])
    create(@Body() data: CreateBrandDto): Promise<Brand> {
        return this.brandsService.create(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateBrandDto[]): Promise<Brand[]> {
        return this.brandsService.insertMany(data);
    }

}