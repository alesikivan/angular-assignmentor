import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'preview-block',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() height: string
  @Input() width: string

  constructor() {
    this.height = '30px'
    this.width = '100%'
  }

  ngOnInit(): void {
  }

}
