import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { Item } from "./item.schema";
import { ItemsService } from "./items.service";

@Controller('api/resources/items')
export class ItemsController {

    constructor(
        private itemsService: ItemsService
    ) { }

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post('import')
    insertMany(@Body() data: CreateItemDto[]): Promise<Item[]> {
        return this.itemsService.inertMany(data);
    }

}