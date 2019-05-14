import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/model/general';

@Component({
  selector: 'forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent implements OnInit {
  @Input() weather: Weather;
  @Input() degresType = 'celsius';

  public symbol: string;
  constructor() { }

  ngOnInit() {
    this.symbol = this.degresType === 'celsius' ? '&#176;' : '&#8457;';
  }

}
