import { IsNotEmpty } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class CreateColorDto {
    @IsNotEmpty()
    name: string;
}

export const jsonSchema = validationMetadatasToSchemas();