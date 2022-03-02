import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/Message';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages!: Message[];
  pagination!: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });


    // console.log(this.pagination.currentPage);
    // console.log(this.pagination.itmsPerPage = 5);
    // console.log(this.pagination.totalItems);
    // console.log(this.pagination.totalPages);

  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
          this.alertify.success("Message has been deleted");
        }, error => {
          this.alertify.error("Failed to delete the message");
        });
    });
  }


  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itmsPerPage = 5, this.messageContainer).subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }











}
