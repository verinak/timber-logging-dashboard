import {
    Component,
    computed,
    inject,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import { ResponseApplication } from '../../interfaces/application.interface';
import { AppsService } from '../../services/apps/apps.service';
import { DatePipe, NgClass } from '@angular/common';
import { LogLevel, LogSortBy } from '../../interfaces/log.interface';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    switchMap,
    tap,
} from 'rxjs';
import {
    takeUntilDestroyed,
    toObservable,
    toSignal,
} from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-application-details',
    imports: [DatePipe, NgClass, ReactiveFormsModule],
    templateUrl: './application-details.component.html',
    styleUrl: './application-details.component.css',
})
export class ApplicationDetailsComponent implements OnInit {
    @Input() appId!: string;

    private appsService = inject(AppsService);
    private router = inject(Router);

    app = signal<ResponseApplication | null>(null);
    error = '';

    // query params
    limit = 10;
    sortBy = signal<LogSortBy>('recent');
    level = signal<'all' | LogLevel>('all');
    query = signal('');

    // gets logs on (app, page, ) change
    logsResponse = toSignal(
        toObservable(
            computed(() => ({
                app: this.app(),
                page: this.page(),
                sortBy: this.sortBy(),
                level: this.level(),
                query: this.query(),
            })),
        ).pipe(
            filter(({ app }) => !!app),

            switchMap(({ app, page, sortBy, level, query }) =>
                this.appsService
                    .getLogs(app!.name, {
                        page,
                        limit: this.limit,
                        sortBy: sortBy === 'recent' ? 'recent' : 'count',
                        level: level === 'all' ? undefined : level,
                        search: query?.trim() || undefined,
                    })
                    .pipe(
                        map((res) => ({
                            logs: res.logs,
                            totalCount: res.totalCount,
                        })),
                    ),
            ),
        ),
        {
            initialValue: {
                logs: [],
                totalCount: 0,
            },
        },
    );

    // pagination signals
    page = signal(1);
    totalPages = computed(() =>
        Math.ceil(this.logsResponse().totalCount / this.limit),
    );
    startItem = computed(() => (this.page() - 1) * this.limit + 1);
    endItem = computed(() =>
        Math.min(this.page() * this.limit, this.logsResponse().totalCount),
    );
    visiblePages = computed(() => {
        const total = this.totalPages();
        const current = this.page();

        const pages: number[] = [];

        const start = Math.max(1, current - 1);
        const end = Math.min(total, current + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    });

    searchControl = new FormControl('', { nonNullable: true });

    constructor() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntilDestroyed(),
            )
            .subscribe((value) => {
                // console.log(value);
                this.query.set(value);
                this.page.set(1); // reset pagination
                // console.log(this.query());
            });
    }

    ngOnInit(): void {
        this.appsService.getApplication(this.appId).subscribe({
            next: (app) => {
                this.app.set(app);
                console.log(app);
            },

            error: (err) => {
                if (err.status === 403) {
                    this.error = "You don't have permission to access this app";
                } else if (err.status === 404) {
                    this.error = "This app doesn't exist";
                } else {
                    console.error('request failed', err);
                }
            },
        });
    }

    severityStyles: Record<LogLevel, { badge: string }> = {
        INFO: {
            badge: 'bg-secondary-container/20 text-secondary border-secondary/30',
        },
        WARN: {
            badge: 'bg-tertiary/10 text-tertiary border-tertiary/30',
        },
        ERROR: {
            badge: 'bg-error-container/20 text-error border-error/30',
        },
    };

    setPage(page: number) {
        const total = this.totalPages();

        if (page < 1 || page > total) return;

        this.page.set(page);
    }

    setLevel(level: 'all' | LogLevel) {
        this.level.set(level);
        this.page.set(1); // reset pagination
    }

    toggleSort() {
        this.sortBy.update((current) =>
            current === 'recent' ? 'count' : 'recent',
        );

        this.page.set(1); // reset pagination
    }

    deleteApp() {
        const deletedApp = this.app(); // save app in case delete fails
        // console.log(this.app());

        // update signal (optimistic update)
        this.appsService.removeApp(this.appId);

        this.appsService.deleteApplication(this.appId).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                if (deletedApp) this.appsService.addApp(deletedApp); // revert signal update
                console.error("couldn't delete application", err);
            },
        });
    }
}
