import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'character', loadChildren: './character/character.module#CharacterPageModule' },
  { path: 'modalpage', loadChildren: './modalpage/modalpage.module#ModalpagePageModule' },
  { path: 'page1', loadChildren: './page1/page1.module#Page1PageModule' },

  { path: 'page2', loadChildren: './page2/page2.module#Page2PageModule' },
  { path: 'page2/:item_id', loadChildren: './page2/page2.module#Page2PageModule' },
  { path: 'page2/:item_id/:opt_id', loadChildren: './page2/page2.module#Page2PageModule' },

  { path: 'page3', loadChildren: './page3/page3.module#Page3PageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
