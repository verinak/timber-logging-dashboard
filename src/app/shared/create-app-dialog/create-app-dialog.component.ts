import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ShowModalService } from '../../services/show-modal/show-modal.service';

@Component({
    selector: 'app-create-app-dialog',
    imports: [],
    templateUrl: './create-app-dialog.component.html',
    styleUrl: './create-app-dialog.component.css',
})
export class CreateAppDialogComponent implements OnInit, OnDestroy {
    constructor(private showModalService: ShowModalService) {}

    closeModal() {
        this.showModalService.close();
    }

    ngOnInit() {
        document.body.classList.add('modal-open');
    }

    ngOnDestroy() {
        document.body.classList.remove('modal-open');
    }
}
