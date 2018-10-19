import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {

  @Input('size') size: any; 
  @Input('text-align') textAlign: any;

  constructor() {
    console.log ('PageHeaderComponent');
    console.log ('this.size: ' + this.size);
    console.log ('this.textAlign: ' + this.textAlign);

    this.size = this.size === undefined ? 'small' : this.size;
    this.textAlign = this.textAlign === undefined ? 'center' : this.textAlign;
  }
}
