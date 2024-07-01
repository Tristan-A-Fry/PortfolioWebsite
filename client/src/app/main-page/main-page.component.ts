import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd, Event as NavigationEvent, RouterModule} from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
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
      title: 'Home Section',
      content: 'skdhfkjlsdhfjksdhfjklhsdkjhfklsjdfklsdhfjkhsfklsdlkfhskdhf'
    },
    aboutSectoin:{
      title: 'About Me',
      content:'250 powerhouse'
    },
    educationSection:{
      title: 'Education',
      content:'smart af yo'
    },
    projectsSection:{
      title: 'Projects',
      content: 'Very good projects, now hire me'
    },
  };
}
