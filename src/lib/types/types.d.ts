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

export interface Venta {
    id: number;
    cliente: Cliente;
    fecha: Date;
    pagacon: number;
    vueltos: number;
    metodoDePago: string;
    venttall: Venttall[];
}