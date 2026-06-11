import { Component } from '@angular/core';
import { AppGridComponent } from '../../shared/app-grid/app-grid.component';
import { ShowModalService } from '../../services/show-modal/show-modal.service';

@Component({
    selector: 'app-dashboard-apps',
    imports: [AppGridComponent],
    templateUrl: './dashboard-apps.component.html',
    styleUrl: './dashboard-apps.component.css',
})
export class DashboardAppsComponent {
    constructor(private showModalService: ShowModalService) {}

    openModal() {
        this.showModalService.open();
    }
}
