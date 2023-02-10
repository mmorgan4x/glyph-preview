import { Component } from "@angular/core";
import { StateManager } from "../state.manager";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  providers: [StateManager],
})
export class LayoutComponent {
  constructor(public state: StateManager) { }
}

//TODO
// .zip support