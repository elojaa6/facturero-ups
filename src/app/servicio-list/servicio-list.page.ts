import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../api/user.service';
import { Servicio } from '../entidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.page.html',
  styleUrls: ['./servicio-list.page.scss'],
})
export class ServicioListPage implements OnInit {

  listadoServicios : Observable<Servicio[]> | undefined;

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private toastController:  ToastController) {
    }

  ngOnInit() {
    const id = JSON.parse(localStorage.getItem('usuario'));
    console.log(id)

    this.listadoServicios = this.userService.listarServicio(id);
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  eliminar(id:any){
    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Estas a punto de eliminar el servicio`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarServicio(id)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/../servicio-list'
              Swal.fire(
                '¡Eliminado!',
                `Servicio eliminado`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/../servicio-list'
              Swal.fire(
                'Error!',
                `Error`,
                'success'
              );
            }
          });
      }
    });
  }

  async mostrarMensaje(mensaje: any){
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
