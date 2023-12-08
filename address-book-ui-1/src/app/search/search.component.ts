import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDetailsService } from '../services/users-details.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

users: any[] = [];
selectedUser: any;
   currentPage: number = 1;
   selectedPageSize: number = 10;
   totalUsers: number = 60;
selectedGender: any;
selectedNationality: string[]=[];
nationalities: any;


   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detailsService: UsersDetailsService
  ) { }
 
  setNationality(selectionChange: string[]) {
    this.selectedNationality = selectionChange;
  }
  setGender(selectionChange: string) {
    this.selectedGender = selectionChange
  }
  applyFilters() {
    this.loadUserData();
  }

   private loadUserData(): void {
     this.detailsService
     .searchUsers(this.currentPage, this.selectedPageSize, this.selectedGender, this.selectedNationality)
     .subscribe((response) => {
       this.detailsService.updateUserData(response.results);
       this.users = response.results;
     });
   }
 
   onPageChange(pageIndex: number): void {
     console.log('Page changed to:', pageIndex + 1);
     this.loadUserData();
   }
 
   onPageSizeChange(pageSize: number): void {
     this.selectedPageSize = pageSize;
     this.loadUserData();
   }
   
   onPreserveDataChange(shouldPreserveData: boolean): void {
     console.log('Preserve data:', shouldPreserveData);
     this.detailsService.setPreserveData(shouldPreserveData);
     this.loadUserData();
   }
 
    onSelectUser(user: any): void {
      this.selectedUser = user;
    }
 }
