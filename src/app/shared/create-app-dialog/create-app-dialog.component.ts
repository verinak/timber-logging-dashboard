import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-create-app-dialog',
    imports: [],
    templateUrl: './create-app-dialog.component.html',
    styleUrl: './create-app-dialog.component.css',
})
export class CreateAppDialogComponent {
    // @Output() closeEmitter = new EventEmitter<void>();

    closeModal() {
        // this.closeEmitter.emit();
    }
}
