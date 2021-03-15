import { IsNotEmpty } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateItemDto } from "./create-item.dto";

export class UpdateItemDto extends CreateItemDto {
    @IsNotEmpty()
    _id: string;
}

export const jsonSchema = validationMetadatasToSchemas();