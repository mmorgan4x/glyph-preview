import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent as GlyphViewerLayoutComponent } from "./glyph-viewer/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: GlyphViewerLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
