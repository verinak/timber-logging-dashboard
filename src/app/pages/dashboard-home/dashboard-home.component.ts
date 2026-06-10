import { Component } from '@angular/core';
import { AppGridComponent } from '../../shared/app-grid/app-grid.component';
import { ShowModalService } from '../../services/show-modal/show-modal.service';

@Component({
    selector: 'app-dashboard-home',
    imports: [AppGridComponent],
    templateUrl: './dashboard-home.component.html',
    styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent {
    constructor(private showModalService: ShowModalService) {}

    openModal() {
        this.showModalService.open();
    }
}
