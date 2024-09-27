import { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Cliente {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    fijo: string;
    descripcion: string;
    mayorista: boolean;
    fechaCreacion: Date;
}

interface Articate {
    id: {
        articulo: number;
        categoria: number;
    }
}

interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    articate: Articate;
}

interface Talla {
    id: number;
    talla: string;
    cantidad: number;
    articulo: Articulo;
}

interface Venttall {
    id: {
        venta: number;
        talla: number;
    },
    cantidad: number;
    precioFinal: number;
    talla: Talla;
}

interface Venta {
    id: number;
    cliente: Cliente;
    fecha: Date;
    pagacon: number;
    vueltos: number;
    venttall: Venttall[];
}

interface VerVentasProps {
    venta: Venta;
    index: number;
}

const VerVentas: FC<VerVentasProps> = ({ venta, index }) => {
    
    return (
        <>
            <tr className={`text-center ${!(index % 2 == 0) ? "bg-black bg-opacity-10" : ""}`} key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.cliente.nombres} {venta.cliente.apellidos}</td>
                <td>{venta.pagacon - venta.vueltos}</td>
                <td>{venta.venttall.map(vt => {
                    return vt.cantidad
                })}</td>
                <td>{new Date(venta.fecha).toLocaleString()}</td>
                <td className="flex justify-center">
                    <button className="items-center flex bg-green-400 hover:bg-green-500 rounded-lg p-1">
                        <Icon className="" icon="mdi:eye-outline" />
                        Ver
                    </button>
                </td>
            </tr>
        </>
    )
}

export default VerVentas;