import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
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

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['create-color', 'admin'])
    create(@Body() data: CreateColorDto): Promise<Color> {
        return this.colorsService.create(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateColorDto[]): Promise<Color[]> {
        return this.colorsService.insertMany(data);
    }

}