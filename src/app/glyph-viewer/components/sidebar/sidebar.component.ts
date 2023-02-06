import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  async upload(files: FileList) {
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
}
