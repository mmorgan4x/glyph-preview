import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StateManager } from '../../state.manager';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  constructor(public state: StateManager) {}

  get fonts() {
    return this.state.fonts;
  }
  glyphs = Array.from(Array(2560).keys()).map((t) => String.fromCharCode(t));

  ngOnInit() {}
}
