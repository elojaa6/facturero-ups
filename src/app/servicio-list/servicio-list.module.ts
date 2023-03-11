import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioListPageRoutingModule } from './servicio-list-routing.module';

import { ServicioListPage } from './servicio-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioListPageRoutingModule
  ],
  declarations: [ServicioListPage]
})
export class ServicioListPageModule {}
