import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaPageRoutingModule } from './factura-routing.module';

import { FacturaPage } from './factura.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    FacturaPageRoutingModule
  ],
  declarations: [FacturaPage]
})
export class FacturaPageModule {}
