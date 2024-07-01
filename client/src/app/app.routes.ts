import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';


export const routes: Routes = [
    {path: 'Home', component: MainPageComponent},
    {path: 'AboutMe', component: MainPageComponent},
    {path: 'Education', component: MainPageComponent},
    {path: 'Projects', component: MainPageComponent},
    {path:'', redirectTo: '/Home', pathMatch:'full'}
];
