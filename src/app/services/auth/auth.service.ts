import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { ResponseUser } from '../../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private BASE_URL = environment.apiUrl;

    user = signal<ResponseUser | null>(null);

    loadUser() {
        return this.me().pipe(tap((user) => this.user.set(user)));
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`, {
            email,
            password,
        });
    }

    loginAndLoadUser(email: string, password: string) {
        return this.login(email, password).pipe(
            switchMap(() => this.loadUser()),
        );
    }

    signup(
        email: string,
        password: string,
        username: string,
    ): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/register`, {
            email,
            password,
            username,
        });
    }

    signupAndLoadUser(email: string, password: string, username: string) {
        return this.signup(email, password, username).pipe(
            switchMap(() => this.loadUser()),
        );
    }

    logout(): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.BASE_URL}/auth/logout`, {})
            .pipe(
                tap(() => {
                    this.user.set(null);
                }),
            );
    }

    me(): Observable<ResponseUser> {
        return this.http.get<ResponseUser>(`${this.BASE_URL}/users/me`);
    }
}
