import { Component } from '@angular/core';
import { AppCardComponent } from './app-card/app-card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-app-grid',
    imports: [AppCardComponent, RouterLink],
    templateUrl: './app-grid.component.html',
    styleUrl: './app-grid.component.css',
})
export class AppGridComponent {}
