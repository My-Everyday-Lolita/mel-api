export interface KeycloakUser {
    preferred_username: string;
    email: string;
    active: boolean;
    realm_access: {
        roles: string[],
    };
}