import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AppIconComponent } from '../../shared/app-icon/app-icon.component';

@Component({
    selector: 'app-auth-layout',
    imports: [RouterOutlet, AppIconComponent, RouterLinkWithHref],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
