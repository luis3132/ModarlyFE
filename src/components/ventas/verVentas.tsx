import React, { FC, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import VerDetalles from "./verDetalles";

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

    const [showVenta, setShowVenta] = useState(false);

    const total = venta.venttall.reduce((total:number, v) => {
        return total + v.precioFinal;
    }, 0);

    const cantidad = venta.venttall.reduce((total:number, v) => {
        return total + v.cantidad;
    }, 0);

    const handleShowVenta = () => {
        setShowVenta(!showVenta);
    }
    return (
        <>
            <tr className={`text-center ${!(index % 2 == 0) ? "bg-black bg-opacity-10" : ""}`} key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.cliente.nombres} {venta.cliente.apellidos}</td>
                <td>{total}</td>
                <td>{cantidad}</td>
                <td>{new Date(venta.fecha).toLocaleString()}</td>
                <td className="flex justify-center">
                    <button className="items-center flex bg-green-400 hover:bg-green-500 rounded-lg p-1" onClick={handleShowVenta} >
                        <Icon className="" icon="mdi:eye-outline" />
                        Ver
                    </button>
                </td>
            </tr>
            {showVenta && <VerDetalles closeComponent={handleShowVenta} key={venta.cliente.cedula} venta={venta}  />}
        </>
    )
}

export default VerVentas;