import { Body, Controller, Get, Post } from "@nestjs/common";
import { Color } from "./color.schema";
import { ColorsService } from "./colors.service";
import { CreateColorDto } from "./dto/create-color.dto";

@Controller('api/resources/colors')
export class ColorsController {

    constructor(
        private colorsService: ColorsService
    ) { }

    @Get()
    findAll(): Promise<Color[]> {
        return this.colorsService.findAll();
    }

    @Post('import')
    insertMany(@Body() data: CreateColorDto[]): Promise<Color[]> {
        return this.colorsService.inertMany(data);
    }

}