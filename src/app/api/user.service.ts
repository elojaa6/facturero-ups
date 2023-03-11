import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, FacturaCabecera, Servicio, Usuario } from '../entidades';


import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  item: any;

  endpoint = environment.backEndServer + 'api/';

  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})}; 

  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  //Usuario  

  register(usuario: Usuario): Observable<any>{
    let finalUrl = this.endpoint + 'usuario/create';

    return this.httpClient.post<Usuario>(finalUrl, JSON.stringify(usuario), this.httpOptions);
  }

  login(usuario: Usuario): Observable<any>{
    let finalUrl = this.endpoint + 'usuario/login';

    return this.httpClient.post<Usuario>(finalUrl, JSON.stringify(usuario), this.httpOptions);
  }

  recuperarUser() {
    const data = localStorage.getItem('usuario');
    if (data) {
      const usuario = JSON.parse(data);
      console.log(usuario)
      return usuario.id;
    }
    return null;
  }

  public cerrarSesion() {
    localStorage.clear();
  }

  //Cliente

  registerCliente(cliente: Cliente): Observable<any>{
    let finalUrl = this.endpoint + 'cliente/create';

    return this.httpClient.post<Cliente>(finalUrl, JSON.stringify(cliente), this.httpOptions);
  }


  listarCliente(): Observable<Cliente[]>{
    let finalUrl = this.endpoint + 'cliente/findAll';

    return this.httpClient.get<Cliente[]>(finalUrl, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  editarCliente(cliente: Cliente){
    let finalUrl = this.endpoint + 'cliente/update';

    return this.httpClient.post<Cliente>(finalUrl, cliente, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  buscarCedulaCliente(cedula:string):Observable<Cliente>{
    let finalUrl = this.endpoint + 'cliente/findByCedula'
    return this.httpClient.get<Cliente>(`${finalUrl}/${cedula}`);
  }

  eliminarCliente(id: number) {
    let finalUrl = this.endpoint + 'cliente/delete'
    return this.httpClient.get(`${finalUrl}/${id}`);
  }

  //Servicio

  registerServicio(servicio: Servicio): Observable<any>{
    let finalUrl = this.endpoint + 'servicio/create';

    return this.httpClient.post<Servicio>(finalUrl, JSON.stringify(servicio), this.httpOptions)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  listarServicio(id:number):Observable<Servicio[]>{
    let finalUrl = this.endpoint + 'servicio/findAll'
    return this.httpClient.get<Servicio[]>(`${finalUrl}/${id}`, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
    
  }

  editarServicio(servicio:Servicio) {
    let finalUrl = this.endpoint + 'servicio/update'
    return this.httpClient.post<Servicio>(finalUrl, servicio, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  buscarIdServicio(userId: number, serviceId: number) {
    return this.listarServicio(userId)
      .pipe(
        map(res => {
          console.log(res);
          return res.find(s => s.id == serviceId)
        })
      );
  }

  eliminarServicio(id: number) {
    let finalUrl = this.endpoint + 'servicio/delete'
    return this.httpClient.get(`${finalUrl}/${id}`);
  }

  //FACTURA

  registerFactura(factura: FacturaCabecera): Observable<any> {
    let finalUrl = this.endpoint + 'factura/create';
    console.log(JSON.stringify(factura))
    return this.httpClient.post<FacturaCabecera>(finalUrl, JSON.stringify(factura), this.httpOptions)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );


  }

  listarAllServicio(idUser: number): Observable<FacturaCabecera[]> {
    let finalUrl = this.endpoint + 'factura/findAll';
    return this.httpClient.get<FacturaCabecera[]>(finalUrl+"/"+idUser, this.httpOptions)
  }

  listarAllServicioEmitidos(idUser: number): Observable<FacturaCabecera[]> {
    let finalUrl = this.endpoint + 'factura/findAll/issued';
    return this.httpClient.get<FacturaCabecera[]>(finalUrl+"/"+idUser, this.httpOptions)
  }

  listarAllServicioAnuladas(idUser: number): Observable<FacturaCabecera[]> {
    let finalUrl = this.endpoint + 'factura/findAll/cancel';
    return this.httpClient.get<FacturaCabecera[]>(finalUrl+"/"+idUser, this.httpOptions)
  }

  deleteFac(id: number){
    let finalUrl = this.endpoint + 'factura/cancel';
    return this.httpClient.get(finalUrl+"/"+id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
