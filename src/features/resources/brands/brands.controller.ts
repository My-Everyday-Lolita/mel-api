import { Body, Controller, Get, Post } from "@nestjs/common";
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

    @Post('import')
    insertMany(@Body() data: CreateBrandDto[]): Promise<Brand[]> {
        return this.brandsService.inertMany(data);
    }

}