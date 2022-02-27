import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PaginatedResult } from "../_models/Pagination";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class MemberListResolver implements Resolve<PaginatedResult<User[]>>{

    pageNumber = 1;
    pageSize = 5;


    constructor(private userService: UserService, 
        private router: Router, private alertify:AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>>{
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => { 
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/home']);

                return of();
            })
        );
    }

        


}