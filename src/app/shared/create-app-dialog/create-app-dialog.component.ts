import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
        if (this.appName.invalid) {
            return;
        }

        const name = this.appName.value;

        // optimistic update
        this.appsService.addApp({
            name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        this.appsService.createApplication(name).subscribe({
            next: (app) => {
                // console.log(app);
                // this.appsService.updateApp(name, app); // update with api response for date and time consistency
                // i'm skipping the update thing here because using 'name' only for update can be problematic
                // it's better to have a tempId in the optimistic app update, and then delete and add the response app
                // bs ana el api 3andi m4 3mlah byraga3 el appId fa m4 3arfa a3mel keda
                this.showModalService.close();
            },
            error: (err) => {
                // handle error
                this.appsService.removeApp(name); // revert signal update on error
                console.error("couldn't create application", err);
            },
        });
    }
}
