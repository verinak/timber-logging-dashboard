import { Component } from '@angular/core';
import { AppGridComponent } from '../../shared/app-grid/app-grid.component';

@Component({
    selector: 'app-dashboard-apps',
    imports: [AppGridComponent],
    templateUrl: './dashboard-apps.component.html',
    styleUrl: './dashboard-apps.component.css',
})
export class DashboardAppsComponent {}
