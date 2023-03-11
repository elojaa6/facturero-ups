import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioChangePage } from './servicio-change.page';

const routes: Routes = [
  {
    path: ':servicio',
    component: ServicioChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioChangePageRoutingModule {}
