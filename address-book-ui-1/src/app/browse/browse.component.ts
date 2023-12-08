import { Component, OnInit } from '@angular/core';
import { UsersDetailsService } from '../services/users-details.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
 users: any[] = [];
  selectedUser: any;
  currentPage: number = 1;
  selectedPageSize: number = 10;
  totalUsers: number = 60;

  constructor(
    private detailsService: UsersDetailsService
  ) { }

  ngOnInit(): void {
    this.detailsService.userData$.subscribe((userData) => {
      this.users = userData;
    });

    this.loadUserData();
  }

  private loadUserData(): void {
    this.detailsService.getUsers(this.currentPage, this.selectedPageSize).subscribe((response) => {
      this.detailsService.updateUserData(response.results);
      this.users = response.results;
    });
  }

  onPageChange(pageIndex: number): void {
    console.log('Page changed to:', pageIndex + 1);
    this.loadUserData();
  }

   onSelectUser(user: any): void {
     this.selectedUser = user;
   }
}
