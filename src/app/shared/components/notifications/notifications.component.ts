import { Component, OnInit } from '@angular/core';
import { AppNotification } from '../../interfaces';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  notifications: AppNotification[] = []

  constructor(
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.notifications = this.notificationService.getAll()
  }
}
