import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import jwtDecode from "jwt-decode";
import { KeycloakUser } from "./user.model";

export const User = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const headers = context.switchToHttp().getRequest().headers;
        const token = headers.authorization.replace('Bearer ', '');
        return jwtDecode<KeycloakUser>(token);
    }
);