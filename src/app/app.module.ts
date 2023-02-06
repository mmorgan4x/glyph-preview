import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LayoutComponent as GlyphViewerLayoutComponent } from './glyph-viewer/layout/layout.component';
import { NavbarComponent } from './glyph-viewer/components/navbar/navbar.component';
import { SidebarComponent } from './glyph-viewer/components/sidebar/sidebar.component';
import { FooterComponent } from './glyph-viewer/components/footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule, AppRoutingModule],
  declarations: [
    AppComponent,
    GlyphViewerLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
