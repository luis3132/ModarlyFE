import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useState } from "react";
import VerDetalles from "../ventas/verDetalles";

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

interface VentaClienteProps {
    venta: Venta;
    index: number;
}

const VentaCliente: FC<VentaClienteProps> = ({ venta, index }) => {
    const total = venta.venttall.reduce((total, i) => {
        return total + (i?.precioFinal || 0);
    }, 0);
    const [show, setShow] = useState(false);
    return (
        <>
            <div className={`flex w-full p-1 items-center justify-between rounded-xl ${index % 2 === 0 ? "bg-gray-400 bg-opacity-20" : "bg-gray-400 bg-opacity-10"}`}>
                <h1 className="text-lg font-bold">{venta.id}</h1>
                <h1 className="text-lg font-bold">Total: {total}</h1>
                <h1 className="text-lg font-bold">Fecha: {new Date(venta.fecha).toLocaleDateString()}</h1>
                <button className="bg-lime-500 hover:bg-lime-600font-bold py-2 flex items-center px-4 rounded-xl" onClick={() => setShow(true)}>
                    <Icon className="" icon="mdi:eye-outline" />
                    Ver</button>
            </div>
            {show && <VerDetalles venta={venta} closeComponent={() => setShow(false)} />}
        </>
    );
}

export default VentaCliente;