import { Component } from '@angular/core';
import { UsersDetailsService } from './services/users-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  result: any;
  title: any;

  constructor(private dataService: UsersDetailsService) {}
}
