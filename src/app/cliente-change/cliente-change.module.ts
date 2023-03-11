import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteChangePageRoutingModule } from './cliente-change-routing.module';

import { ClienteChangePage } from './cliente-change.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ClienteChangePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ClienteChangePage]
})
export class ClienteChangePageModule {}
