import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ENV } from '../environement/env.model';

@Injectable()
export class KeycloakService {

    private domain: string;
    private realm: string;
    private introspectUrl: string;

    constructor(
        private http: HttpService,
        private configService: ConfigService
    ) {
        this.domain = this.configService.get<string>(ENV.KEYCLOAK_DOMAIN);
        this.realm = this.configService.get<string>(ENV.KEYCLOAK_REALM);
        this.introspectUrl = `${this.domain}/auth/realms/${this.realm}/protocol/openid-connect/token/introspect`
    }

    introspect(username: string, token: string): Observable<any> {
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('token', token);
        data.append('client_id', this.configService.get<string>(ENV.KEYCLOAK_REALM_CLIENT_ID));
        data.append('client_secret', this.configService.get<string>(ENV.KEYCLOAK_REALM_CLIENT_SECRET));
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return this.http.post(this.introspectUrl, data, options);
    }

}