import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[] = [];

  pagination!: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;

      this.pagination.itmsPerPage = Math.ceil(this.pagination.totalItems / this.pagination.totalPages);


      // console.log(this.pagination.currentPage);
      // console.log(this.pagination.totalPages);
      // console.log(this.pagination.totalItems);
      // console.log(this.pagination.itmsPerPage);

    })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itmsPerPage)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;

        this.pagination.itmsPerPage = Math.ceil(this.pagination.totalItems / this.pagination.totalPages);

      }, error => {
        this.alertify.error(error);
      });
  }



}
