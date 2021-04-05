import { IsNotEmpty } from "class-validator";
import { defaultMetadataStorage } from 'class-transformer/storage'
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { CreateCategoryDto } from "./create-category.dto";


export class UpdateCategoryDto extends CreateCategoryDto {
    @IsNotEmpty()
    _id: string;
}

export const jsonSchema = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
});