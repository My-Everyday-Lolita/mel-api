import { Body, Controller, Get, Patch, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/features/keycloak/guards/auth.guard";
import { RolesGuard } from "src/features/keycloak/guards/roles.guard";
import { UserContent } from "./user-contents.schema";
import { UserContentsService } from "./user-contents.service";
import { User } from "src/features/keycloak/user.decorator";
import { KeycloakUser } from "src/features/keycloak/user.model";
import { UpdateUserContentDto } from "./dto/update-user-content.dto";

@Controller('api/resources/user-contents')
export class UserContentsController {

    constructor(
        private userContentsService: UserContentsService
    ) { }

    @Get('me')
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['uma_authorization'])
    getOrCreate(@User() user: KeycloakUser): Promise<UserContent> {
        return this.userContentsService.getOrCreate(user.email);
    }

    @Patch()
    @UseGuards(AuthGuard, RolesGuard)
    @SetMetadata('roles', ['own', 'admin'])
    update(@Body() data: UpdateUserContentDto): Promise<UserContent> {
        return this.userContentsService.update(data);
    }

}