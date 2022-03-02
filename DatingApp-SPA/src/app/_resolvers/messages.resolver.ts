import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../_models/Message";
import { PaginatedResult } from "../_models/Pagination";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>>{

    pageNumber = 1;
    pageSize = 5;
    messageContainer = "Unread";


    constructor(private userService: UserService, 
        private router: Router, private alertify:AlertifyService,
        private authService:AuthService){}


    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>>{
        return this.userService.getMessages(this.authService.decodedToken.nameid, 
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => { 
                this.alertify.error('Problem retriving message');
                this.router.navigate(['/home']);

                return of();
            })
        );
    }

        


}