import { Body, Controller, Get, Post } from "@nestjs/common";
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

    @Post('import')
    insertMany(@Body() data: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoriesService.inertMany(data);
    }

}