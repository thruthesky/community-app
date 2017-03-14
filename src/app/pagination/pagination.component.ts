import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'page-navigation',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PageNavigationComponent {

  numbers = [];
  no_of_total_pages = 0;
  //totalDisplayed = 0;
  currentDisplay = 0;

  @Input() no_of_total_items :number = null;
  @Input() no_of_items_in_one_page:number = null;
  @Input() no_of_pages_in_navigator:number = null;
  @Input() no_of_current_page:number = null;
  @Input() show_prev_next:boolean = true;
  @Input() show_first_last:boolean = true;

  @Output() pageClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }
  
  ngOnChanges(){
    console.log("ngOnChanges: ...");
    if ( this.no_of_total_items > 0 ) this.showPagination();
  }

  showPagination() {
    console.log('this.no_of_total_items:', this.no_of_total_items);
    this.no_of_total_pages = Math.ceil(this.no_of_total_items / this.no_of_items_in_one_page);


    //this.totalDisplayed =  this.no_of_pages_in_navigator;


    // if ( this.no_of_pages_in_navigator == 0 ) return;

    this.currentDisplay = Math.floor( (this.no_of_current_page -1) / this.no_of_pages_in_navigator);
    console.log('showPagination::currentDisplay',this.currentDisplay);
    console.log('showPagination::no_of_pages_in_navigator',this.no_of_pages_in_navigator);
    console.log('showPagination::totalPage',this.no_of_total_pages);


    this.numbers = [];
    for ( let i = 0; i < this.no_of_pages_in_navigator; i ++ ) {
      let current_page_no = this.currentDisplay  * this.no_of_pages_in_navigator + i;
      let next_block_page_no = ( this.currentDisplay + 1)  * this.no_of_pages_in_navigator;
      if ( current_page_no < this.no_of_total_pages && current_page_no < next_block_page_no ) {
        this.numbers.push( current_page_no + 1 );
      }
    }
    // for( let i = this.currentDisplay; (i < this.no_of_total_pages) && ( i < ( this.currentDisplay * this.no_of_pages_in_navigator )) ; i ++ ) this.numbers.push( i );
    console.log('numbers: ', this.numbers);
  }
  nextPage(){
    let nextPage = (this.currentDisplay + 1) * this.no_of_pages_in_navigator + 1;
    console.log('nextPage: ', nextPage);
    this.pageClick.emit( nextPage );
  }
  previousPage(){
    this.pageClick.emit( this.no_of_current_page-1 );
  }
  gotoPage( page ) {
    console.log('page: ', page);
    this.pageClick.emit( page );
  }
  gotoLast() {
    this.pageClick.emit( this.no_of_total_pages );
  }
  gotoFirst() {
    this.pageClick.emit( 1 );
  }



}
