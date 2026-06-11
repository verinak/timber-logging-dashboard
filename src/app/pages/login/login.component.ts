import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);

    loginForm!: FormGroup;
    error = '';

    constructor() {
        const exisintgEmail =
            this.router.getCurrentNavigation()?.extras.state?.['email'] || '';

        this.loginForm = this.fb.group({
            email: [
                exisintgEmail,
                [
                    Validators.required,
                    Validators.pattern(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    ),
                ],
            ],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    login(email: string, password: string) {
        this.authService.loginAndLoadUser(email, password).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                if (err.status == 401) {
                    this.error = 'Incorrect username or password';
                } else {
                    console.error('login failed', err);
                }
            },
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        // console.log('Form value:', this.loginForm.value);
        this.login(this.loginForm.value.email!, this.loginForm.value.password!);
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
