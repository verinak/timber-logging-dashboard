import { Component, inject, signal } from '@angular/core';
import { AppGridComponent } from '../../shared/app-grid/app-grid.component';
import { ShowModalService } from '../../services/show-modal/show-modal.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard-home',
    imports: [AppGridComponent, RouterLink],
    templateUrl: './dashboard-home.component.html',
    styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent {
    private authService = inject(AuthService);
    private toastr = inject(ToastrService);

    userData = this.authService.user()!;

    showApiKey = false;

    constructor(private showModalService: ShowModalService) {}

    get maskedApiKey(): string {
        const key = this.userData?.apiKey ?? '';

        if (!key || this.showApiKey) {
            return key;
        }

        const start = key.slice(0, 3);
        const end = key.slice(-3);

        return `${start}${'*'.repeat(Math.max(0, key.length - 6))}${end}`;
    }

    async copyApiKey(): Promise<void> {
        try {
            await navigator.clipboard.writeText(this.userData.apiKey);
            this.toastr.info('Coppied to clipboard');
            // Optional: show toast/snackbar
        } catch (err) {
            console.error('Failed to copy API key', err);
        }
    }

    openModal() {
        this.showModalService.open();
    }
}
