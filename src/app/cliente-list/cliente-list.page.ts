import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from '../api/user.service';
import { Cliente } from '../entidades';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
})
export class ClienteListPage implements OnInit {

  listadoClientes: Observable<Cliente[]> | undefined ;

  constructor(private userService: UserService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.listadoClientes = this.userService.listarCliente();
  }

  eliminar(id:any){
    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Estas a punto de eliminar el cliente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarCliente(id)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/../cliente-list'
              Swal.fire(
                '¡Eliminado!',
                `Cliente eliminado`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/../cliente-list'
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
