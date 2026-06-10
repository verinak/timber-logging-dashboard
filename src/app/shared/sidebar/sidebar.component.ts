import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../app-icon/app-icon.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-sidebar',
    imports: [AppIconComponent, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('logout failed', err);
            },
        });
    }
}
