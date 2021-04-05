import { IsNotEmpty } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateColorDto } from "./create-color.dto";

export class UpdateColorDto extends CreateColorDto {
    @IsNotEmpty()
    _id: string;
}

export const jsonSchema = validationMetadatasToSchemas();