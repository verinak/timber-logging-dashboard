import {
    Component,
    EventEmitter,
    inject,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ShowModalService } from '../../services/show-modal/show-modal.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    of,
    startWith,
    switchMap,
} from 'rxjs';
import { AppsService } from '../../services/apps/apps.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-app-dialog',
    imports: [ReactiveFormsModule],
    templateUrl: './create-app-dialog.component.html',
    styleUrl: './create-app-dialog.component.css',
})
export class CreateAppDialogComponent implements OnInit, OnDestroy {
    private appsService = inject(AppsService);
    private router = inject(Router);

    appName = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[a-z0-9-]+$/i)],
    });

    constructor(private showModalService: ShowModalService) {}

    // debouce name availability check
    isNameAvailable = toSignal(
        this.appName.valueChanges.pipe(
            startWith(this.appName.value),
            debounceTime(500),
            distinctUntilChanged(),
            filter((name) => name.trim().length > 0),
            switchMap((name) =>
                this.appsService
                    .checkNameAvailability(name)
                    .pipe(catchError(() => of(false))),
            ),
        ),
        { initialValue: true },
    );

    closeModal() {
        this.showModalService.close();
    }

    ngOnInit() {
        document.body.classList.add('modal-open');
    }

    ngOnDestroy() {
        document.body.classList.remove('modal-open');
    }

    createApplication() {
        console.log('in submit');
        if (this.appName.invalid) {
            return;
        }

        // console.log(this.appName.value);

        this.appsService.createApplication(this.appName.value).subscribe({
            next: (app) => {
                this.showModalService.close();
                this.router.navigate(['/dashboard']); // i am tired ok don't judge
            },
            error: (err) => {
                // handle error
                console.error("couldn't create application", err);
            },
        });
    }
}
