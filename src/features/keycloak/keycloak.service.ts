import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENV } from '../environement/env.model';

@Injectable()
export class KeycloakService {

    private token: string;
    private tokenUrl: string;

    constructor(
        private http: HttpService,
        private configService: ConfigService
    ) {
        this.tokenUrl = `${this.configService.get<string>(ENV.KEYCLOAK_DOMAIN) || 'http://localhost:8080'}/auth/realms/master/protocol/openid-connect/token`;
    }

    connect(): Observable<boolean> {
        if (this.token) {
            return of(true);
        }
        const data = new URLSearchParams();
        data.append('client_id', this.configService.get<string>(ENV.KEYCLOAK_CLIENT_ID) || 'admin-cli');
        data.append('grant_type', 'client_credentials');
        data.append('client_secret', this.configService.get<string>(ENV.KEYCLOAK_CLIENT_SECRET));
        return this.http.post(this.tokenUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).pipe(
            map(response => {
                this.token = response.data.access_token;
                return true;
            })
        );
    }

    getAccessToken(): string {
        return this.token;
    }

    invalidToken(): void {
        this.token = undefined;
    }

}