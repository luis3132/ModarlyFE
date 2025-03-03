import React, { FC, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import VerDetalles from "./verDetalles";
import { Venta } from "@/lib/types/types";

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
            <tr className={`text-center ${!(index % 2 == 0) ? "bg-gray-300" : ""}`} key={venta.id}>
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