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

export class UserContentCoordinationFieldDto {
    @IsNotEmpty()
    type: string;

    value: any;
}

export class UserContentCoordinationDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    theme: string;

    @IsOptional()
    event: string;

    @IsOptional()
    place: string;

    @IsOptional()
    date: Date;

    @ValidateNested({ each: true })
    @Type(() => UserContentCoordinationFieldDto)
    fields: UserContentCoordinationFieldDto[];
}

export class CreateUserContentDto {
    @ValidateNested({ each: true })
    @Type(() => UserContentVariantDto)
    closet: UserContentVariantDto[];

    @ValidateNested({ each: true })
    @Type(() => UserContentVariantDto)
    wishlist: UserContentVariantDto[];

    @ValidateNested({ each: true })
    @Type(() => UserContentCoordinationDto)
    coordinations: UserContentCoordinationDto[];

    @IsEmail()
    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    modified: number;
}

export const jsonSchema = validationMetadatasToSchemas();