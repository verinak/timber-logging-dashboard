import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShowModalService {
    private _isOpen = signal(false);
    readonly isOpen = this._isOpen.asReadonly();

    constructor() {}

    open() {
        this._isOpen.set(true);
    }

    close() {
        this._isOpen.set(false);
    }
}
