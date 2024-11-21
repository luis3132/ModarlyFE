import React, { FC } from "react";
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

interface VentasHoyProps {
    ventas: Venta[];
}

const filterVentasByTimeRange = (ventas: Venta[], startHour: number, endHour: number) => {
    return ventas.filter(venta => {
        const ventaHour = new Date(venta.fecha).getHours();
        return ventaHour >= startHour && ventaHour < endHour;
    });
};

const VentasHoy: FC<VentasHoyProps> = ({ ventas }) => {
    const madrugadaVentas = filterVentasByTimeRange(ventas, 0, 6);
    const mananaVentas = filterVentasByTimeRange(ventas, 6, 12);
    const tardeVentas = filterVentasByTimeRange(ventas, 12, 18);
    const nocheVentas = filterVentasByTimeRange(ventas, 18, 24);
    return (
        <>
            <div className="w-full h-dvh overflow-y-scroll custom-scrollbar">
                <div className="w-full justify-center flex pt-10">
                    <h1 className="text-3xl font-bold text-black">Ventas de hoy</h1>
                </div>
                {madrugadaVentas.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Madrugada (12 am - 6 am)
                        </div>
                        <div className="w-full justify-center flex pt-1">
                            <div className="w-[80%] max-md:w-full bg-black bg-opacity-15 max-h-56 rounded-xl p-5 overflow-y-scroll custom-scrollbar">
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
                                        {madrugadaVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {mananaVentas.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Mañana (6 am - 12 pm)
                        </div>
                        <div className="w-full justify-center flex pt-1">
                            <div className="w-[80%] max-md:w-full bg-black bg-opacity-15 max-h-64 rounded-xl p-5 overflow-y-scroll custom-scrollbar">
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
                                        {mananaVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {tardeVentas.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Tarde (12 pm - 6 pm)
                        </div>
                        <div className="w-full justify-center flex pt-1">
                            <div className="w-[80%] max-md:w-full bg-black bg-opacity-15 max-h-64 rounded-xl p-5 overflow-y-scroll custom-scrollbar">
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
                                        {tardeVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {nocheVentas.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Noche (6 pm - 12 am)
                        </div>
                        <div className="w-full justify-center flex pt-1">
                            <div className="w-[80%] max-md:w-full bg-black bg-opacity-15 max-h-56 rounded-xl p-5 overflow-y-scroll custom-scrollbar">
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
                                        {nocheVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventas.length === 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-center text-red-500 text-3xl">No hay ventas registradas el Dia de hoy</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default VentasHoy;