import { Component, ElementRef, ViewChild } from '@angular/core';
import { StateManager } from '../../state.manager';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent {

  constructor(public state: StateManager) { }

  @ViewChild('inputEl1') inputEl1: ElementRef | null = null;

  ngAfterViewInit() {
    this.state.inputEl = this.inputEl1?.nativeElement;
  }

  focus(inputEl: HTMLInputElement) {
    this.state.inputEl = inputEl;
  }

  blur(e: FocusEvent) {
    e.preventDefault()
    let target = e.relatedTarget as HTMLElement | null;
    if (target?.classList.contains('glyph')) {
      (e.target as HTMLElement | null)?.focus()
    }
  }
}
