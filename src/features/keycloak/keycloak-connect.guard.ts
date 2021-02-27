import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class KeycloakConnectGuard implements CanActivate {

    constructor(private keycloakService: KeycloakService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.keycloakService.connect();
    }

}