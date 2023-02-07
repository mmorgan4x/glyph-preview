import { Injectable } from '@angular/core';
import { Font } from 'src/types';

@Injectable()
export class StateManager {

  fonts: Font[] = [];

  async createFont(file: File) {
    let font: Font = {
      name: file.name,
      url: await this.readFileAsync(file)
    }
    let newFont = new FontFace(font.name, `url(${font.url})`);
    let loadedFont = await newFont.load();
    (document as any).fonts.add(loadedFont);
    return font;
  }

  addFont(font: Font) {
    this.fonts.push(font);
  }

  async readFileAsync(file: File) {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
