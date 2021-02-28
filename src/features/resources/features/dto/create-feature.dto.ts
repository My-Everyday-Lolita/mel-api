import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateCategoryDto } from "../../categories/dto/create-category.dto";

export class CreateFeatureDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateCategoryDto)
    categories: CreateCategoryDto[]
}

export const jsonSchema = validationMetadatasToSchemas();