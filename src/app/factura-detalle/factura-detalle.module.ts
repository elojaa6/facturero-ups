import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaDetallePageRoutingModule } from './factura-detalle-routing.module';

import { FacturaDetallePage } from './factura-detalle.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FacturaDetallePageRoutingModule,
    SharedModule
  ],
  declarations: [FacturaDetallePage]
})
export class FacturaDetallePageModule {}
