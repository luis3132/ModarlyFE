import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useState } from "react";
import { Venta } from "@/lib/types/types";
import VerDetalles from "../ventas/verDetalles";

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
            <div className={`flex w-full p-1 items-center mb-2 justify-between rounded-xl ${index % 2 === 0 ? "bg-gray-400 bg-opacity-20" : "bg-gray-400 bg-opacity-10"}`}>
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