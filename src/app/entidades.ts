export class Usuario{
    id?: number ;
    username : string = '';
    password : string = '';
    confirmPassword? : string;
}

export class Cliente{
    id?: number ;
    tipoIdentificacion : string;
    identificacionNumero : string;
    nombre : string;
    direccion : string;
    telefono : string;
    correoElectronico : string;
}

export class Servicio{
    id?: number ;
    descripcion : string ='';
    precioUnitario : number = 0.00;
    userId: number = 0;
}

export class Detalles {
    cantidad: number;
    precioUnitario: number;
    total: number;
    servicioId: number;
}


export class FacturaCabecera {
    fechaDeEmision: Date;
    subtotal: number;
    impuesto: number;
    total: number;
    clienteId: number;
    usuarioId: number;
    detalles: Detalles[]
}

/*export class Detalle{
    cantidad : number=0;
    precioUnitario:number=0.00;
    total :number=0.00;
    servicioId?:number;
}
export class Factura{
    id?:number;
    fechaDeEmision: Date=new Date();   
    subtotal :number=0.00;
    impuesto : number=0.00;
    total : number=0.00;   
    clienteId : number=0;
    usuarioId : number=0;    
    detalles: Detalle[]=[];
    estadoFactura?: string;
        
}
export interface FacturaDetalle {
    id: number;
    fechaDeEmision: Date;
    subtotal: number;
    impuesto: number;
    total: number;
    cliente: Cliente;
    detalles: DetalleFac[];
    usuario: Usuario;
    estadoFactura: string;
  }
  export interface DetalleFac{
    cantidad : number;
    precioUnitario:number;
    total :number;
    servicio : Servicio;
}*/