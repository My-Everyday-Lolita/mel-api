import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class CreateBrandDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    shortname?: string;
}

export const jsonSchema = validationMetadatasToSchemas();