import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  async upload(files: File[]) {
    let file = files[0];
    let fontUrl = await this.readFileAsync(file);

    let new_font = new FontFace('custom-font', `url(${fontUrl})`);
    let loadedFont = await new_font.load();
    (document as any).fonts.add(loadedFont);
  }

  readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  dragCounter = 0;
  showBorder = false;

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
    let files = Array.from(e.dataTransfer?.files || []);
    this.upload(files);
  }
}
