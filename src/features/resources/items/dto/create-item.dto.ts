import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateBrandDto } from "../../brands/dto/create-brand.dto";

export class CreateItemDto {
    @IsNotEmpty()
    @ValidateNested()
    brand: CreateBrandDto;

    @IsString()
    @MaxLength(150)
    @IsOptional()
    collectionn: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    category: any[];

    @IsNotEmpty()
    @ValidateNested({ each: true })
    variants: any[];
}

export const jsonSchema = validationMetadatasToSchemas();