import { Component } from '@angular/core';
import { Gylph } from 'src/types';
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


  glyphs: Gylph[] = [];
  //Array.from(Array(25600).keys()).map((t) => ({ code: t, unicode: this.hex(t), char: String.fromCharCode(t) }));
  // 57344-63743
  ngOnInit() {
    // let arr = Array.from(Array(1114112).keys());
    let arr = Array.from(Array(5000).keys());
    // let arr = ['ǁ'.charCodeAt(0)]
    for (let i = 57344; i <= 63743; i++) {
      arr.push(i);
    }
    this.glyphs = arr.map((t) => ({ code: t, unicode: this.hex(t), char: String.fromCharCode(t), isDefault: false }));


  }


  async proccessGlyphs() {
    console.time()

    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.height = 100;
    canvas.width = 100;
    // canvas.style.position = 'fixed';
    // canvas.style.left = '0';
    // canvas.style.top = '0';
    document.body.appendChild(canvas)
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false, willReadFrequently: true })!;


    for (let glyph of this.glyphs.concat()) {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${canvas.height}px ${this.state.selectedFont?.name.split(',')[0]}`;
      ctx.fillStyle = '#fff';
      ctx.fillText(glyph.char, 1, canvas.height);
      ctx.font = `${canvas.width}px fallback`;
      ctx.fillStyle = '#000';
      ctx.fillText(glyph.char, 1, canvas.width);

      let data = ctx.getImageData(0, 0, canvas.width, canvas.height);

      glyph.isDefault = true;
      for (let i = 0; i < data.data.length; i += 4) {
        let d = data.data[i];
        if (d == 255) {
          // glyph.uniqueness = (count / (100 * 100));
          glyph.isDefault = false;
          break;
        }
      }
      // await new Promise(t => setTimeout(t, 1));
    }
    this.glyphs = this.glyphs.filter(t => !t.isDefault)
    console.timeEnd()
  }

  hex(value: number) {
    return `U+${value.toString(16).toUpperCase().padStart(4, '0')}`
  }
}
