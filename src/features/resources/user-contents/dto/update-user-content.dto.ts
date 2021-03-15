import { IsNotEmpty } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { CreateUserContentDto, UserContentVariantDto } from "./create-user-content.dto";

export class UpdateUserContentVariantDto extends UserContentVariantDto {
    @IsNotEmpty()
    _id: string;
}

export class UpdateUserContentDto extends CreateUserContentDto {
    @IsNotEmpty()
    _id: string;
}

export const jsonSchema = validationMetadatasToSchemas();