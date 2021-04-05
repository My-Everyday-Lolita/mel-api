import { IsNotEmpty } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateBrandDto } from "./create-brand.dto";

export class UpdateBrandDto extends CreateBrandDto {
    @IsNotEmpty()
    _id: string;
}

export const jsonSchema = validationMetadatasToSchemas();