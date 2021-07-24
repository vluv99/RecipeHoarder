import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.scss']
})
export class HorizontalListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollEvent(container: any): void{
    var $this = container.currentTarget;

    let scrollLeft:number = $this.scrollLeft;
    let maxScrollWidth = $this.innerWidth;
    let maxScrollAmt = $this.maxSscrollWidth - maxScrollWidth

    console.log($this.scrollLeft);

    /*
      scrollLeft = $this.scrollLeft(),
      maxScrollWidth = $this.innerWidth(),
      maxScrollAmt = $this.find("ul").prop('scrollWidth') - maxScrollWidth
*/
    if (scrollLeft >= maxScrollAmt) {
      $this.closest(".hor-scroll-wrap").addClass("scrolled-right");
    } else {
      $this.closest(".hor-scroll-wrap").removeClass("scrolled-right");
    }

    if (scrollLeft > 0) {
      $this.closest(".hor-scroll-wrap").addClass("scrolled-left");
    } else {
      $this.closest(".hor-scroll-wrap").removeClass("scrolled-left");
    }
     
  }

}
