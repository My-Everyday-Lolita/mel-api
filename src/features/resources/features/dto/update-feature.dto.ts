import { IsNotEmpty } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateFeatureDto } from "./create-feature.dto";

export class UpdateFeatureDto extends CreateFeatureDto {
    @IsNotEmpty()
    _id: string;
}

export const jsonSchema = validationMetadatasToSchemas();