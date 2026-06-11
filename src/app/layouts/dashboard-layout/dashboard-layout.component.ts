import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    imports: [RouterOutlet, SidebarComponent],
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {}
