import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class UserContentVariantDto {
    @IsNotEmpty()
    id: string;

    @IsBoolean()
    @IsOptional()
    wantToSell: boolean;
}

export class CreateUserContentDto {
    @ValidateNested({ each: true })
    @Type(() => UserContentVariantDto)
    closet: UserContentVariantDto[];

    @ValidateNested({ each: true })
    @Type(() => UserContentVariantDto)
    wishlist: UserContentVariantDto[];

    @IsEmail()
    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    modified: number;
}

export const jsonSchema = validationMetadatasToSchemas();