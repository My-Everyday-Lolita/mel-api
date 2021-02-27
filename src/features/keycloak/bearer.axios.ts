import { AxiosFulfilledInterceptor, AxiosInterceptor } from "@narando/nest-axios-interceptor";
import { HttpService, Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class KeycloakBearerAxiosInterceptor extends AxiosInterceptor {
    constructor(
        http: HttpService,
        private keycloak: KeycloakService
    ) {
        super(http);
    }

    requestFulfilled(): AxiosFulfilledInterceptor<AxiosRequestConfig> {
        return (config) => {
            if (config.headers.Authorization === true) {
                config.headers.Authorization = `Bearer ${this.keycloak.getAccessToken()}`;
            }
            return config;
        }
    }
}