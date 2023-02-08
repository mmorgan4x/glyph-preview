import { Component, HostListener } from '@angular/core';
import { StateManager } from '../../state.manager';
import { Font } from 'src/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public state: StateManager) { }

  get fonts() {
    return this.state.fonts;
  }

  async uploadFont(fileList?: FileList) {
    let files = Array.from(fileList || []);
    for (let file of files) {
      let font = await this.state.createFontFromFile(file);
      await this.state.loadFont(font);
      this.state.addFont(font);
    }
  }

  dragCounter = 0;
  showBorder = false;

  // #region drag and drop
  @HostListener('window:drop', ['$event'])
  @HostListener('window:dragover', ['$event'])
  cancelDrop = (e: DragEvent) => {
    e.preventDefault();
    (<any>e.dataTransfer).dropEffect = 'none';
  };
  @HostListener('dragover', ['$event'])
  cancelDrops = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (<any>e.dataTransfer).dropEffect = 'move';
  };
  @HostListener('dragenter', ['$event'])
  dragenter(e: DragEvent) {
    this.dragCounter++;
    this.showBorder = true;
  }
  @HostListener('dragleave', ['$event'])
  dragleave(e: DragEvent) {
    this.dragCounter--;
    this.showBorder = this.dragCounter === 0 ? false : this.showBorder;
  }
  @HostListener('drop', ['$event'])
  drop(e: DragEvent) {
    this.dragCounter = 0;
    this.showBorder = false;
    let files = e.dataTransfer?.files;
    this.uploadFont(files);
  }
  // #endregion
}
