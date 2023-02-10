import { Component, HostListener } from '@angular/core';
import { StateManager } from '../../state.manager';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent {

  constructor(public state: StateManager) { }

  ngOnInit() { }

}
