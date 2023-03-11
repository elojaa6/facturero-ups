import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioPageRoutingModule } from './servicio-routing.module';

import { ServicioPage } from './servicio.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ServicioPageRoutingModule,
    SharedModule
  ],
  declarations: [ServicioPage]
})
export class ServicioPageModule {}
