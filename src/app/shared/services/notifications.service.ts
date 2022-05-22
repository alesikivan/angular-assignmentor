import { Injectable } from '@angular/core';
import { AppNotification } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: AppNotification[] = []

  constructor() {}

  add(notification: AppNotification) {
    this.notifications.push(notification)
    this.cleaningDelay(3000)
  }

  success(msg: string) {
    this.add({
      message: msg,
      date: (new Date()).toLocaleTimeString(),
      status: 'success'
    })
  }

  danger(msg: string) {
    this.add({
      message: msg,
      date: (new Date()).toLocaleTimeString(),
      status: 'error'
    })
  }

  default(msg: string) {
    this.add({
      message: msg,
      date: (new Date()).toLocaleTimeString()
    })
  }

  clearNotification() {
    this.notifications.shift()
  }

  getAll() {
    return this.notifications
  }

  cleaningDelay(delay: number) {
    setTimeout(() => {
      this.clearNotification()
    }, delay)
  }

  removeByDate(date: string) {
    // return this.notifications.filter(n => n.date != date)
  }
}
