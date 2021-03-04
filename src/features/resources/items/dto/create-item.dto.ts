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

    @IsOptional()
    @ValidateNested({ each: true })
    features: any[];

    @IsNotEmpty()
    @ValidateNested({ each: true })
    variants: any[];

    @IsOptional()
    year: number;

    @IsOptional()
    japanese: string;

    @IsOptional()
    measurments: string;

    @IsOptional()
    estimatedPrice: number;

    @IsOptional()
    keywords: string[];
}

export const jsonSchema = validationMetadatasToSchemas();