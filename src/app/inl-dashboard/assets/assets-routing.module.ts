import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetsComponent } from './assets/assets.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list',component: AssetsComponent},
      {path: 'detail/:id',component: AssetDetailComponent,},
      {path: 'detail',component: AssetDetailComponent,},
      { path: '', redirectTo: '/dashboard/assets/list', pathMatch: 'full'}
    ]
  },

  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingComponent { }
