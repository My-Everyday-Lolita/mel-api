import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
import { CategoriesService } from "./categories.service";
import { Category } from "./category.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller('api/resources/categories')
export class CategoriesController {

    constructor(
        private categoriesService: CategoriesService
    ) { }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['create-category', 'admin'])
    create(@Body() data: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoriesService.insertMany(data);
    }

}