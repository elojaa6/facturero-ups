import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteChangePage } from './cliente-change.page';

const routes: Routes = [
  {
    path: ':cedula',
    component: ClienteChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteChangePageRoutingModule {}
