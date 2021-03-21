import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
import { CreateItemDto } from "./dto/create-item.dto";
import { Criterium } from "./dto/criterium.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./item.schema";
import { ItemsService } from "./items.service";

@Controller('api/resources/items')
export class ItemsController {

    constructor(
        private itemsService: ItemsService
    ) { }

    @Post('search/')
    findByCriteria(@Body() criteria: Criterium[], @Query('skip', ParseIntPipe) skip: number, @Query('limit', ParseIntPipe) limit: number): Promise<Item[]> {
        return this.itemsService.findByCriteria(criteria, skip || 0, limit || 20);
    }

    @Get('recently-added')
    recentlyAdded(): Promise<Item[]> {
        return this.itemsService.recentlyAdded();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Item> {
        return this.itemsService.findById(id);
    }

    @Put()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['create-item', 'admin'])
    create(@Body() data: CreateItemDto): Promise<Item> {
        return this.itemsService.create(data);
    }

    @Patch()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin', 'own'])
    update(@Body() data: UpdateItemDto): Promise<Item> {
        return this.itemsService.update(data);
    }

    @Post('import')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    insertMany(@Body() data: CreateItemDto[]): Promise<Item[]> {
        return this.itemsService.insertMany(data);
    }

}