import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import jwtDecode from "jwt-decode";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { KeycloakService } from "../keycloak.service";
import { KeycloakUser } from "../user.model";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private keycloakService: KeycloakService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const headers = context.switchToHttp().getRequest().headers;
        if (!headers.authorization) {
            throw new HttpException('No access token found', HttpStatus.UNAUTHORIZED);
        }
        const token = headers.authorization.replace('Bearer ', '');
        if (token === '') {
            throw new HttpException('No access token found', HttpStatus.UNAUTHORIZED);
        }
        const user = jwtDecode<KeycloakUser>(token);
        if (!user.preferred_username) {
            throw new HttpException('No username found', HttpStatus.FORBIDDEN);
        }
        return this.keycloakService.introspect(user.preferred_username, token).pipe(
            map(response => {
                if (response.status !== HttpStatus.OK) {
                    throw new HttpException('An unknown error was occured during authentication check', HttpStatus.INTERNAL_SERVER_ERROR);
                }
                const data = response.data;
                if (data.active === false) {
                    throw new HttpException({
                        statusCode: HttpStatus.UNAUTHORIZED,
                        message: 'Inactive user',
                        inactive: true,
                    }, HttpStatus.UNAUTHORIZED)
                }
                const roleOk = roles.some(role => data.realm_access.roles.includes(role));
                if (!roleOk && roles.includes('own')) {
                    const request = context.switchToHttp().getRequest();
                    return request.body.owner === data.sub || request.body.user === data.sub;
                }
                return roleOk;
            })
        );
    }

}