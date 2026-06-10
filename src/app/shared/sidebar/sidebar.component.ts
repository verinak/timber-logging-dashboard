import { Component } from '@angular/core';
import { AppIconComponent } from '../app-icon/app-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [AppIconComponent, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
