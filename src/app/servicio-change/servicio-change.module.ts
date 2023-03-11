import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioChangePageRoutingModule } from './servicio-change-routing.module';

import { ServicioChangePage } from './servicio-change.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ServicioChangePageRoutingModule,
    SharedModule
  ],
  declarations: [ServicioChangePage]
})
export class ServicioChangePageModule {}
