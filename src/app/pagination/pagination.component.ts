import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'page-navigation',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PageNavigationComponent {

  numbers = [];
  totalPage = 0;
  totalDisplayed = 0;
  currentDisplay = 0;

  @Input() no_of_total_items :number = null;
  @Input() no_of_items_in_one_page:number = null;
  @Input() no_of_pages_in_navigator:number = null;
  @Input() no_of_current_page:number = null;
  @Input() show_prev_next:boolean = true;
  @Input() show_first_last:boolean = true;

  @Output() pageClick = new EventEmitter();

  constructor() { }

  ngOnChanges(){
    this.showPagination();
  }
  showPagination() {
    this.totalPage = Math.ceil(this.no_of_total_items / this.no_of_items_in_one_page);


    this.totalDisplayed =  this.no_of_pages_in_navigator;


    if (this.totalDisplayed == 0 ) return;

    this.currentDisplay = Math.floor( (this.no_of_current_page -1) / this.no_of_pages_in_navigator);
    console.log('showPagination::currentDisplay',this.currentDisplay);
    console.log('showPagination::totalDisplayed',this.totalDisplayed);
    console.log('showPagination::totalPage',this.totalPage);
    this.numbers = Array.from(new Array(this.totalDisplayed), (x,i) => i+1);
  }
  nextPage(){
    this.pageClick.emit( this.no_of_current_page+1 );
  }
  previousPage(){
    this.pageClick.emit( this.no_of_current_page-1 );
  }
  gotoPage( page ) {
    this.pageClick.emit( page );
  }
  gotoLast() {
    this.pageClick.emit( this.totalPage );
  }
  gotoFirst() {
    this.pageClick.emit( 1 );
  }



}
