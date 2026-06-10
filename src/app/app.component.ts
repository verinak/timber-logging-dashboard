import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateAppDialogComponent } from './shared/create-app-dialog/create-app-dialog.component';
import { ShowModalService } from './services/show-modal/show-modal.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CreateAppDialogComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'timber-logging-dashboard';

    constructor(private showModalService: ShowModalService) {}

    get isModalOpen(): boolean {
        return this.showModalService.isOpen();
    }
}
