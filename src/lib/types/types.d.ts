export interface Cliente {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    fijo: string;
    descripcion: string;
    mayorista: boolean;
    fechaCreacion: Date;
    estado: boolean;
}

export interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

export interface CategoriaCreate {
    padre: string;
    hija: string;
    estado: boolean;
}

export interface Articate {
    id: {
        articulo: number;
        categoria: number;
    }
    articulo: Articulo;
    categoria: Categoria;
}

export interface ArticateCreate {
    articulo: number;
    categoria: number;
}

export interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    estado: boolean;
    categorias: Categoria[];
    tallas: Talla[];
}

export interface ArticuloCreate {
    nombre: string;
    descripcion: string;
    precioDetal: number | "";
    precioMayorista: number | "";
    estado: boolean;
    categorias: number[];
    tallas: TallaCreate[];
}

export interface ArticuloUpdate {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number | "";
    precioMayorista: number | "";
    estado: boolean;
}

export interface Talla {
    id: number;
    talla: string;
    cantidad: number;
    estado: boolean;
    articulo: Articulo;
}

export interface TallaCreate {
    talla: string;
    cantidad: number | "";
    estado: boolean;
    articulo: number;
}

export interface TallaUpdate {
    id: number;
    talla: string;
    cantidad: number;
    estado: boolean;
    articulo: number;
}

export interface Venttall {
    id: {
        venta: number;
        talla: number;
    },
    cantidad: number;
    precioFinal: number;
    talla: Talla;
    venta: Venta;
}

export interface VenttallCreate {
    venta: number;
    talla: number;
    cantidad: number;
    precioFinal: number;
}

export interface Venta {
    id: number;
    cliente: Cliente;
    fecha: Date;
    pagacon: number;
    vueltos: number;
    metodoDePago: string;
    venttall: Venttall[];
}

export interface VentaCreate {
    fecha: string;
    cliente: string;
    pagacon: number;
    vueltos: number;
    metodoDePago: string;
    venttall: VenttallCreate[];
}

export interface PrintFactura {
    invoiceNumber: number;
    date: string;
    customer: string;
    customerId: string;
    paymentMethod: string;
    pagacon: number;
    vueltos: number;
    products: {
        name: string;
        talla: string;
        quantity: number;
        price: number;
    }[];
    total: number;
}