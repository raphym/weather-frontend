import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notifications.service';

import { Coordination } from '../../../../model/general';

@Component({
  selector: 'weather-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // get the form
  @ViewChild('f') form: NgForm;

  // output the events
  @Output() public searchEvent = new EventEmitter<string>();
  @Output() public searchGeoEvent = new EventEmitter<Coordination>();

  // searched city variable
  public city = '';

  constructor(private notifService: NotificationService) { }

  // event Enter button: search the weather city from the city variable
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13 && this.city.length > 0) {
      if (this.form.valid) {
        this.search();
      }
    }
  }

  ngOnInit() {
  }

  // search the weather city from the city variable
  search() {
    if (this.city === '') {
      return;
    }

    this.searchEvent.emit(this.city);
    this.city = '';
    this.form.reset();
  }

  // search the weather city by geolocalization
  geo() {
    this.form.reset();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.searchGeoEvent.emit({
            lon: position.coords.longitude,
            lat: position.coords.latitude
          });
        }
      },
        (error: PositionError) => {
          this.notifService.sendNotifEvent.emit({
            message: 'Need permission to use the geolocalization',
            type: 'primary'
          }
          );
        });
    } else {
      if (!navigator.geolocation) {
        this.notifService.sendNotifEvent.emit({
          message: 'The geolocalization does\'nt work in your browser',
          type: 'primary'
        }
        );
      }
    }
  }

}
