import { Component } from '@angular/core';
import { StateManager } from '../../state.manager';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  constructor(public state: StateManager) { }

  get fonts() { return this.state.fonts }
  get selectedFont() { return this.state.selectedFont }

  glyphs = Array.from(Array(2560).keys()).map((t) => ({ code: t, unicode: this.hex(t), char: String.fromCharCode(t) }));

  ngOnInit() { }

  hex(value: number) {
    return `U+${value.toString(16).toUpperCase().padStart(4, '0')}`
  }
}
