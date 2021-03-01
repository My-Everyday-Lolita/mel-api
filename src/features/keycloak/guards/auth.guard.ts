import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const headers = context.switchToHttp().getRequest().headers;
        if (headers.authorization === undefined) {
            throw new HttpException('No access token found', 401);
        }
        return true;
    }

}