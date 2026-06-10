import { Component } from '@angular/core';
import { AppGridComponent } from '../../shared/app-grid/app-grid.component';

@Component({
    selector: 'app-dashboard-home',
    imports: [AppGridComponent],
    templateUrl: './dashboard-home.component.html',
    styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent {}
