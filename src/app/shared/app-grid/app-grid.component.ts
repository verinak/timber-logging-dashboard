import { Component, inject, signal } from '@angular/core';
import { AppCardComponent } from './app-card/app-card.component';
import { RouterLink } from '@angular/router';
import { ShowModalService } from '../../services/show-modal/show-modal.service';
import { AppsService } from '../../services/apps/apps.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ResponseApplication } from '../../interfaces/application.interface';

@Component({
    selector: 'app-app-grid',
    imports: [AppCardComponent],
    templateUrl: './app-grid.component.html',
    styleUrl: './app-grid.component.css',
})
export class AppGridComponent {
    private appsService = inject(AppsService);
    apps = signal<ResponseApplication[]>([]);

    constructor(private showModalService: ShowModalService) {
        this.appsService.getApplications().subscribe({
            next: (apps) => {
                this.apps.set(apps);
                // console.log(apps);
            },
            error: (err) => {
                console.error("couldn't get applications", err);
            },
        });
    }

    openModal() {
        this.showModalService.open();
    }

    // deleteApp(appName: string) {
    //     this.appsService.deleteApplication(appName).subscribe({
    //         next: () => {

    //         },
    //         error: (err) => {
    //             console.error("couldn't delete application", err);
    //         },
    //     });
    // }

    handleDelete(appName: string) {
        const previousApps = this.apps(); // save apps before update in case delete fails

        // update signal (optimistic update)
        this.apps.update((apps) => apps.filter((app) => app.name !== appName));

        // send delete request
        this.appsService.deleteApplication(appName).subscribe({
            error: (err) => {
                this.apps.set(previousApps); // revert signal update
                console.error("couldn't delete application", err);
            },
        });
    }
}
