import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ResponseApplication } from '../../../interfaces/application.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-app-card',
    imports: [DatePipe, RouterLink],
    templateUrl: './app-card.component.html',
    styleUrl: './app-card.component.css',
})
export class AppCardComponent {
    @Input() app!: ResponseApplication;

    @Output() deleteEmitter = new EventEmitter<string>();

    onDeleteClick(): void {
        this.deleteEmitter.emit(this.app.name);
    }
}
