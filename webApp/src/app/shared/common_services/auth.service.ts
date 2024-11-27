import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { ServiceBase } from '@shared/common_services/service-base';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceBase<User> {

  constructor(private jwtHelper: JwtHelperService,
    protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    super(http, baseUrl, 'api/User');
  }

  private get accessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  private set accessToken(value: string) {
    localStorage.setItem('accessToken', value);
  }

  public override post(endpoint: string, data: User): Observable<string> {
    return super.post(endpoint, data).pipe(
      tap(response => {
        this.accessToken = response;
      })
    );
  }

  hasRight(role?: string): boolean {
    const token = this.accessToken;
    if (!token) return false;
    if (!role) return true;

    const decodedToken = this.jwtHelper.decodeToken(token);
    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return role === userRole;
  }

  getUserId(): number {
    const token = this.accessToken;
    if (!token) return 0;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  getUserName(): string {
    const token = this.accessToken;
    if (!token) return '';

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  getUserRole(): string {
    const token = this.accessToken;
    if (!token) return '';

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  isAuthenticated(): boolean {
    const token = this.accessToken;
    if (!token) return false;

    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

}
