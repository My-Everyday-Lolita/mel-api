import { Controller, Get } from "@nestjs/common";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

@Controller('api/resources')
export class ResourcesController {


    @Get('schemas')
    schemas(): any {
        return validationMetadatasToSchemas();
    }
}