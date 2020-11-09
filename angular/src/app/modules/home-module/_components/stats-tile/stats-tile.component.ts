import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-stats-tile]', // use it with tile class
  templateUrl: './stats-tile.component.html',
  styleUrls: ['./stats-tile.component.scss']
})
export class StatsTileComponent implements OnInit {
  constructor() { }
   @Input() stat: number = 0;
   @Input() title: string = 'Title'

  ngOnInit(): void {
  }

}
