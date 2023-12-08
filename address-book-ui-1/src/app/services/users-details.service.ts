import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDetailsService {

  private apiUrl = 'https://localhost:7032/api/random';
  private userDataSubject = new BehaviorSubject<any[]>([]);
  public userData$ = this.userDataSubject.asObservable();
  private preserveData = false;

  constructor(private http: HttpClient) {}

  setPreserveData(value: boolean): void {
    this.preserveData = value;
  }

  updateUserData(data: any[]): void {
    if (this.preserveData) {
      this.userDataSubject.next(data);
    } else {
      this.userDataSubject.next([]);
    }
  }

  getUsers(page: number = 1, results: number=10): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.http.get<any>(`${this.apiUrl}?page=${page}&results=${results}`, { headers });
}

  searchUsers(page: number = 1, results: number = 10, gender?: string, nationalities?: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    let url = `${this.apiUrl}/search?page=${page}&results=${results}`;
    if (gender) {
      url += `&gender=${gender}`;
    }
    if(nationalities) {
      const nationalitiesString = nationalities.join(',');
      url += `&nationalities=${nationalitiesString}`;
    }
    return this.http.get<any>(url, { headers });
  }
}
