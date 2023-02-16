import { Injectable } from '@angular/core';
import { Font } from 'src/types';

@Injectable()
export class StateManager {

  fonts: Font[] = [];
  selectedFont: Font | null = null;

  textOutput = '';
  inputEl: HTMLInputElement | null = null;

  constructor() {
    this.fonts = JSON.parse(localStorage.getItem('fonts') || '[]');
    this.selectedFont = this.fonts[0];
    for (let font of this.fonts) {
      this.loadFont(font);
    }
  }

  async createFontFromFile(file: File) {
    let font: Font = {
      name: file.name,
      url: await this.readFileAsync(file)
    }
    return font;
  }

  async loadFont(font: Font) {
    let newFont = new FontFace(font.name, `url(${font.url})`);
    let loadedFont = await newFont.load();
    (document as any).fonts.add(loadedFont);
  }

  addFont(font: Font) {
    this.fonts.push(font);
    this.selectedFont = font;
    localStorage.setItem('fonts', JSON.stringify(this.fonts))
  }

  deleteFont(font: Font) {
    this.fonts.splice(this.fonts.indexOf(font), 1);
    if (this.selectedFont == font) {
      this.selectedFont = this.fonts[0];
    }
    localStorage.setItem('fonts', JSON.stringify(this.fonts))
  }

  setFont(font: Font | null) {
    this.selectedFont = font;
  }

  getFontFamily(font?: Font) {
    let fontFamily = `'${font?.name || this.selectedFont?.name}'`;
    return [fontFamily, 'var(--bs-body-font-family)'].join(',')
  }

  addGylph(char: string) {
    // this.textOutput += char;
    if (this.inputEl) {
      const start = this.inputEl.selectionStart ?? this.inputEl.value.length;
      const end = this.inputEl.selectionEnd ?? this.inputEl.value.length;
      this.textOutput = `${this.textOutput.slice(0, start)}${char}${this.textOutput.slice(end)}`;
      // this.inputEl.focus();
      setTimeout(() => {
        this.inputEl?.setSelectionRange(start + 1, start + 1);
      });
    }
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
