import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
