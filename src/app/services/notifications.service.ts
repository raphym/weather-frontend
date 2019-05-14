import { EventEmitter, Injectable } from '@angular/core';

import { Notification } from '../model/general';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    // event to show the notif panel
    public sendNotifEvent = new EventEmitter<Notification>();
    // event to close the notif panel
    public closeEvent = new EventEmitter<void>();
    constructor() {

    }
}
