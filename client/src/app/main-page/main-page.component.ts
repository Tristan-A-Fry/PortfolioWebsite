import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd, Event as NavigationEvent, RouterModule} from '@angular/router';
import { InteractiveBackgroundComponent } from '../interactive-background/interactive-background.component';
import { DecryptTextComponent } from '../decrypt-text/decrypt-text.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterModule, InteractiveBackgroundComponent, DecryptTextComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', [
        animate('2s')
      ])
    ])
  ]
})
export class MainPageComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.url.substring(this.router.url.indexOf('#') + 1);
        this.scrollTo(fragment);
      }
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  sectionData ={
    homeSection:{
      name: "Tristan",
    },
    aboutSection:{
      title: 'About Me',
    },
    educationSection:{
      title: 'Education',
    },
    projectsSection:{
      title: 'Projects',
      content: 'Very good projects, now hire me'
    },
  };
  homeText: string = '';
  ngOnInit(): void
  {
    this.homeText = `Hello, I'm <span class='name'>${this.sectionData.homeSection.name}</span>.<br>I am an aspiring full-stack developer.`;
  }
}
