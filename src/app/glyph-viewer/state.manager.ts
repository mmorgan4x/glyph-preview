import { Injectable } from '@angular/core';

@Injectable()
export class StateManager {
  fonts: any[] = [];

  addFont(file: any) {
    this.fonts.push(file);
  }
}
