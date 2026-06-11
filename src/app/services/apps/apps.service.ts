import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
    NameAvailability,
    ResponseApplication,
} from '../../interfaces/application.interface';
import {
    ApiResponse,
    PaginatedResponse,
} from '../../interfaces/api-response.interface';
import { ApplicationLog, LogsQuery } from '../../interfaces/log.interface';

@Injectable({
    providedIn: 'root',
})
export class AppsService {
    private http = inject(HttpClient);
    private BASE_URL = environment.apiUrl;

    constructor() {}

    /**
     * GET /api/applications
     */
    getApplications(): Observable<ResponseApplication[]> {
        return this.http
            .get<
                ApiResponse<ResponseApplication[]>
            >(`${this.BASE_URL}/applications`)
            .pipe(map((res) => res.data));
    }

    /**
     * POST /api/applications
     */
    createApplication(name: string): Observable<ResponseApplication> {
        return this.http
            .post<
                ApiResponse<ResponseApplication>
            >(`${this.BASE_URL}/applications`, { name })
            .pipe(map((res) => res.data));
    }

    /**
     * POST /api/applications/check-name
     */
    checkNameAvailability(name: string): Observable<boolean> {
        return this.http
            .post<
                ApiResponse<NameAvailability>
            >(`${this.BASE_URL}/applications/check-name`, { name })
            .pipe(map((res) => res.data.available));
    }

    /**
     * GET /api/applications/:name
     */
    getApplication(name: string): Observable<ResponseApplication> {
        return this.http
            .get<
                ApiResponse<ResponseApplication>
            >(`${this.BASE_URL}/applications/${encodeURIComponent(name)}`)
            .pipe(map((res) => res.data));
    }

    /**
     * DELETE /api/applications/:name
     */
    deleteApplication(name: string): Observable<void> {
        return this.http.delete<void>(
            `${this.BASE_URL}/applications/${encodeURIComponent(name)}`,
        );
    }

    /**
     * GET /api/applications/:name/logs
     */
    getLogs(
        appName: string,
        query?: LogsQuery,
    ): Observable<{
        logs: ApplicationLog[];
        totalCount: number;
    }> {
        let params = new HttpParams();

        if (query?.search) {
            params = params.set('search', query.search);
        }

        if (query?.level) {
            params = params.set('level', query.level);
        }

        if (query?.sortBy) {
            params = params.set('sortBy', query.sortBy);
        }

        if (query?.page !== undefined) {
            params = params.set('page', query.page);
        }

        if (query?.limit !== undefined) {
            params = params.set('limit', query.limit);
        }

        return this.http
            .get<
                PaginatedResponse<ApplicationLog>
            >(`${this.BASE_URL}/applications/${encodeURIComponent(appName)}/logs`, { params })
            .pipe(
                map((res) => ({
                    logs: res.data,
                    totalCount: res.meta?.[0]?.total_count ?? 0,
                })),
            );
    }
}
