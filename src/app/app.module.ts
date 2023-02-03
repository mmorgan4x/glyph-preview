import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { LayoutComponent as GlyphViewerLayoutComponent } from "./glyph-viewer/layout/layout.component";

@NgModule({
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  declarations: [AppComponent, GlyphViewerLayoutComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
