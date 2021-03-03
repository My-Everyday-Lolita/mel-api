import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class CreateColorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Matches(/^#[a-z0-9]{3,6}/)
    hex: string;
}

export const jsonSchema = validationMetadatasToSchemas();