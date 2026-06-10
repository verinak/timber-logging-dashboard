import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    private toastr = inject(ToastrService);

    signup(email: string, password: string, username: string) {
        this.authService
            .signupAndLoadUser(email, password, username)
            .subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    if (err.status == 409) {
                        this.toastr.error(
                            'Email already registered. Please log into your account.',
                        );
                        this.router.navigate(['/login'], {
                            state: { email }, // send email to login page
                        });
                    } else {
                        console.error('signup failed', err);
                    }
                },
            });
    }

    signupForm = this.fb.group({
        email: [
            '',
            [
                Validators.required,
                Validators.pattern(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                ),
            ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        fullName: [
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.pattern(/^[a-zA-Z ]+$/),
            ],
        ],
    });

    onSubmit() {
        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }

        // console.log('Form value:', this.signupForm.value);
        this.signup(
            this.signupForm.value.email!,
            this.signupForm.value.password!,
            this.signupForm.value.fullName!,
        );
    }

    get email() {
        return this.signupForm.get('email');
    }

    get password() {
        return this.signupForm.get('password');
    }

    get fullName() {
        return this.signupForm.get('fullName');
    }
}
