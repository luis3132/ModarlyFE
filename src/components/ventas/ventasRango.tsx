import { FC } from "react";
import VerVentas from "./verVentas";

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

interface VentasRangoProps {
    ventas: Venta[];
}

const VentasRango: FC<VentasRangoProps> = ({ ventas }) => {
    return (
        <>
            <div className="w-full overflow-y-scroll custom-scrollbar">
                <div className="w-full justify-center flex pt-10">
                    <h1 className="text-3xl font-bold text-black">Ventas</h1>
                </div>
                <div className="px-10 max-md:px-1 py-5 w-full">
                    <div className="w-full justify-center flex pt-1">
                        <div className="w-[80%] max-md:w-full bg-black bg-opacity-15 rounded-xl p-5 custom-scrollbar mb-10">
                            {ventas.length === 0 ? (
                                <div className="text-center text-red-500 text-3xl">No hay ventas en este rango de tiempo</div>
                            ) : (
                                <table className="w-full">
                                    <thead className="jus">
                                        <tr>
                                            <th>Id</th>
                                            <th>Cliente</th>
                                            <th>Total</th>
                                            <th>Cantidad</th>
                                            <th>Fecha</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ventas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VentasRango;