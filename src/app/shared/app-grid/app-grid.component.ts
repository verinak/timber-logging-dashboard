import { Component } from '@angular/core';
import { AppCardComponent } from './app-card/app-card.component';
import { RouterLink } from '@angular/router';
import { ShowModalService } from '../../services/show-modal/show-modal.service';

@Component({
    selector: 'app-app-grid',
    imports: [AppCardComponent, RouterLink],
    templateUrl: './app-grid.component.html',
    styleUrl: './app-grid.component.css',
})
export class AppGridComponent {
    constructor(private showModalService: ShowModalService) {}

    openModal() {
        this.showModalService.open();
    }
}
