import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaListPage } from './factura-list.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaListPageRoutingModule {}
