import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested, ValidationTypes } from "class-validator";
import { defaultMetadataStorage } from 'class-transformer/storage'
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { IOptions } from "class-validator-jsonschema/build/options";
import { ValidationMetadata } from "class-validator/types/metadata/ValidationMetadata";


export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    shortname?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateCategoryDto)
    children?: CreateCategoryDto[];
}

export const jsonSchema = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    // additionalConverters: {
    //     [ValidationTypes.NESTED_VALIDATION]: (meta: ValidationMetadata, options: IOptions): any => {
    //         return {
    //             '$ref': meta.target.toString()
    //         };
    //     }
    // }
});