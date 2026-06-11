import { Component, computed, inject, Input, signal } from '@angular/core';
import { AppCardComponent } from './app-card/app-card.component';
import { ShowModalService } from '../../services/show-modal/show-modal.service';
import { AppsService } from '../../services/apps/apps.service';

@Component({
    selector: 'app-app-grid',
    imports: [AppCardComponent],
    templateUrl: './app-grid.component.html',
    styleUrl: './app-grid.component.css',
})
export class AppGridComponent {
    @Input() limit: number | null = null;
    private appsService = inject(AppsService);

    // apps = this.appsService.apps;
    apps = computed(() => {
        const apps = this.appsService
            .apps()
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        return this.limit ? apps.slice(0, this.limit) : apps;
    });

    constructor(private showModalService: ShowModalService) {}

    ngOnInit() {
        if (this.apps().length === 0) {
            this.appsService.loadApps().subscribe();
        }
    }

    openModal() {
        this.showModalService.open();
    }

    handleDelete(appName: string) {
        const deletedApp = this.apps().find((app) => app.name === appName); // save app in case delete fails

        // update signal (optimistic update)
        this.appsService.removeApp(appName);

        // send delete request
        this.appsService.deleteApplication(appName).subscribe({
            error: (err) => {
                if (deletedApp) this.appsService.addApp(deletedApp); // revert signal update
                console.error("couldn't delete application", err);
            },
        });
    }
}
