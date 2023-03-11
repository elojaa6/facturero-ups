import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaListPageRoutingModule } from './factura-list-routing.module';

import { FacturaListPage } from './factura-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaListPageRoutingModule
  ],
  declarations: [FacturaListPage]
})
export class FacturaListPageModule {}
