import { Body, Controller, Delete, Get, Param, Patch, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
import { Brand } from "./brand.schema";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Controller('api/resources/brands')
export class BrandsController {

    constructor(
        private brandsService: BrandsService
    ) { }

    @Get()
    findAll(): Promise<Brand[]> {
        return this.brandsService.findAll();
    }

    @Put()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['create-brand', 'admin'])
    create(@Body() data: CreateBrandDto): Promise<Brand> {
        return this.brandsService.create(data);
    }

    @Patch()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['edit-brand', 'admin'])
    update(@Body() data: UpdateBrandDto): Promise<Brand> {
        return this.brandsService.update(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateBrandDto[]): Promise<Brand[]> {
        return this.brandsService.insertMany(data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    delete(@Param('id') id: string): Promise<any> {
        return this.brandsService.delete(id);
    }

}