import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'servicio',
    loadChildren: () => import('./servicio/servicio.module').then( m => m.ServicioPageModule)
  },
  {
    path: 'cliente-list',
    loadChildren: () => import('./cliente-list/cliente-list.module').then( m => m.ClienteListPageModule)
  },
  {
    path: 'servicio-list',
    loadChildren: () => import('./servicio-list/servicio-list.module').then( m => m.ServicioListPageModule)
  },
  {
    path: 'cliente-change',
    loadChildren: () => import('./cliente-change/cliente-change.module').then( m => m.ClienteChangePageModule)
  },
  {
    path: 'servicio-change',
    loadChildren: () => import('./servicio-change/servicio-change.module').then( m => m.ServicioChangePageModule)
  },
  {
    path: 'factura',
    loadChildren: () => import('./factura/factura.module').then( m => m.FacturaPageModule)
  },
  {
    path: 'factura-detalle',
    loadChildren: () => import('./factura-detalle/factura-detalle.module').then( m => m.FacturaDetallePageModule)
  },
  {
    path: 'factura-list',
    loadChildren: () => import('./factura-list/factura-list.module').then( m => m.FacturaListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
