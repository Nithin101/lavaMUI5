import { Directive, ElementRef, Renderer } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart } from '@angular/router';

@Directive({
  selector: '[appGeneral]'
})
export class GeneralDirective {

}
var $: any;

@Directive({
  selector: '[is-active-nav]'
})
export class isActiveNav {
  constructor(private router: Router,
    private el: ElementRef,
    private renderer: Renderer) {
    let urlSet;

    renderer.setElementStyle(el.nativeElement, 'class', 'active');
    router.events.subscribe((val) => {
      urlSet = this.router.url;
      // console.log(urlSet) ;

      if (this.router.url) {
        // console.log("app", this.el.nativeElement.attributes['href'].value) 
      var cp1 = this.router.url.includes("/moment/");
      var cp2 = this.router.url.includes("/view-moment/");
      var cp3 = this.router.url.includes("/moment-perfomance/");
      var cp4 = this.router.url.includes("/engagement-perfomance/");
      var cp5 = this.router.url.includes("/abtest-perfomance/");
      var cp6 = this.router.url.includes("/broadcast");
      console.log('native element',this.el.nativeElement);
      if (this.router.url === this.el.nativeElement[0].attributes['href'].value) {
        console.log(this.el.nativeElement.parentNode);
        this.renderer.setElementClass(this.el.nativeElement.parentNode, 'active', true)
        this.renderer.setElementClass(this.el.nativeElement.parentNode, 'active', this.el.nativeElement.parentNode.classList.contains('.has-submenu'))
    } 
    else if (cp1 || cp2 ) {
        $('.design > ul.submenu > li.moments').addClass('active');
        $('.design > ul.submenu > li.moments').parents('.has-submenu').addClass('active');
    } else if (cp3) {
        $('.analyze > ul.submenu > li.gaming').addClass('active');
        $('.analyze > ul.submenu > li.gaming').parents('.has-submenu').addClass('active');
    } else if (cp4 ) {
        $('.analyze > ul.submenu > li.masterpass').addClass('active');
        $('.analyze > ul.submenu > li.masterpass').parents('.has-submenu').addClass('active');
    } else if (cp5 ) {
        $('.analyze > ul.submenu > li.abtest').addClass('active');
        $('.analyze > ul.submenu > li.abtest').parents('.has-submenu').addClass('active');
    } else if (cp6) {
        $('.home').addClass('active');
    } else {
      this.renderer.setElementClass(this.el.nativeElement.parentNode, 'active', false)
    }
    }
      // console.log("val", val);
    });
  }

}

@Directive({
  selector: '[editSrc]'
})
export class editSrc {

  constructor() { }

}

@Directive({
  selector: '[pie-graph]'
})
export class pieGraph {
  constructor(
    private el: ElementRef) {
      console.log(el);

  }
}
