import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/model/general';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'weather-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notif: Notification;
  constructor(private notifService: NotificationService) { }

  ngOnInit() {
  }

  // close the window notif
  close() {
    this.notifService.closeEvent.emit();
  }

}
