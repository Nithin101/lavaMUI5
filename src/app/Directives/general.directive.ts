import { Directive, ElementRef, Renderer, Renderer2, Input } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart } from '@angular/router';
import * as d3 from "d3";
declare var $ :any;


@Directive({
  selector: '[appGeneral]'
})
export class GeneralDirective {

}

@Directive({
  selector: '[is-active-nav]'
})
export class isActiveNav {
  constructor(private router: Router,
    private el: ElementRef,
    private renderer: Renderer,
    renderer2: Renderer2) {

    renderer.setElementStyle(el.nativeElement, 'class', 'active');
    router.events.subscribe((val) => {
      if (this.router.url) {
      var cp1 = this.router.url.includes("/moment/");
      var cp2 = this.router.url.includes("/view-moment/");
      var cp3 = this.router.url.includes("/moment-perfomance/");
      var cp4 = this.router.url.includes("/engagement-perfomance/");
      var cp5 = this.router.url.includes("/abtest-perfomance/");
      var cp6 = this.router.url.includes("/broadcast");
      if (this.router.url === this.el.nativeElement.attributes['href'].value) {
        // this.renderer.setElementClass(this.el.nativeElement.parentNode, 'active', true);
        renderer2.addClass(this.el.nativeElement.parentNode, 'active');
        // renderer2.addClass(this.el.nativeElement.parentNode.querySelectorAll('.has-submenu'), 'active');
        // this.renderer.setElementClass(this.el.nativeElement.parentNode, 'active', this.el.nativeElement.parentNode.classList.contains('.has-submenu'))
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
        $('. ').addClass('active');
    } else {
     this.renderer.setElementClass(this.el.nativeElement.parentNode, 'active', false)
    }
    }
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
  @Input() percent: number;
  constructor(private el: ElementRef) { }
  ngOnInit() {

    let mySvg = d3.select(this.el.nativeElement)
      .append("svg")
      .attr("width", 263)
      .attr("height", 117);

    let percent = this.percent;

    let ratio = percent / 100;

    // Constructs a  pie function 	
    let pie = d3.pie()
      .sort(null);

    let width_topmoments = 263,
      height_topmoments = 117;

    let radius = 58.5;

    let svg = mySvg.append('g')
      .attr("class", "group-pie")
      .attr("transform", "translate(" + width_topmoments / 2 + "," + height_topmoments / 2 + ")"); //75

    // Background pie chart
    let arc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius - 7)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    // Progress pie chart
    let arcLine = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius - 7)
      .startAngle(0)
      .cornerRadius(25);

    let pathBackground = svg.append('path')
      .attr("d", arc)
      .style("fill", "#f5f5f5");

    let pathChart = svg.append('path')
      .datum({
        endAngle: 0
      })
      .attr("d", arc)
      .style("fill", "#03d2ff")
      .attr("transform", "rotate(180)");

    let arcTween = function (transition, newAngle) {
      transition.attrTween("d", function (d) {
        let interpolate = d3.interpolate(d.endAngle, newAngle);
        let interpolateCount = d3.interpolate(0, percent);
        return function (t) {
          d.endAngle = interpolate(t);
          return arcLine(d);
        };
      });
    };

    let animate = function () {
      pathChart.transition()
        .duration(750)
        //.ease('cubic')
        .call(arcTween, ((2 * Math.PI)) * ratio);
    };
    setTimeout(animate, 0);

  }

}
