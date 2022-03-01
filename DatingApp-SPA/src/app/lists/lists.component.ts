import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users!:User[];
  pagination!:Pagination;
  likesParam!:string;

  constructor(private authService:AuthService, private userService:UserService,
    private route:ActivatedRoute, private alertify:AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;

      this.pagination.itmsPerPage = Math.ceil(
        this.pagination.totalItems / this.pagination.totalPages
      );
    });
    this.likesParam = 'Likers';

    console.log(this.pagination.itmsPerPage);
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itmsPerPage, null, this.likesParam)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;

          this.pagination.itmsPerPage = Math.ceil(
            this.pagination.totalItems / this.pagination.totalPages
          );
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }






}
