import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.scss']
})
export class HorizontalListComponent implements OnInit {

  showLeft: boolean = false;
  showRight: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  scrollEvent(container: any): void{
    var $this : HTMLDivElement = container.currentTarget;

    //       self width
    // |---------------------------|
    //
    // |   parent width     |
    // |--------------------|------|
    // |                    |

    //Current scroll amount
    let scrollAmount:number = $this.scrollLeft;

    let selfWidth = $this.scrollWidth;
    let maxScrollAmt = selfWidth - $this.parentElement!.offsetWidth;

    //console.log("Scrollamount: "+scrollAmount + " of " + maxScrollAmt);

    /*
      scrollLeft = $this.scrollLeft(),
      maxScrollWidth = $this.innerWidth(),
      maxScrollAmt = $this.find("ul").prop('scrollWidth') - maxScrollWidth
*/
    if (scrollAmount >= maxScrollAmt) {
      //$this.closest(".hor-scroll-wrap").addClass("scrolled-right");
      this.showRight = false;
    } else {
      //$this.closest(".hor-scroll-wrap").removeClass("scrolled-right");
      this.showRight = true;
    }

    if (scrollAmount > 0) {
      //$this.closest(".hor-scroll-wrap").addClass("scrolled-left");
      this.showLeft = true;
    } else {
      //$this.closest(".hor-scroll-wrap").removeClass("scrolled-left");

      this.showLeft = false;
    }

  }

}
