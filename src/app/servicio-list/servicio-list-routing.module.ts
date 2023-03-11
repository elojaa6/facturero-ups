import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioListPage } from './servicio-list.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioListPageRoutingModule {}
