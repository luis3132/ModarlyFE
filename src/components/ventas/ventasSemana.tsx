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

interface VentasSemanaProps {
    ventas: Venta[];
}

const VentasSemana: FC<VentasSemanaProps> = ({ ventas }) => {
    const ventasLunes = ventas.filter(venta => new Date(venta.fecha).getDay() === 1);
    const ventasMartes = ventas.filter(venta => new Date(venta.fecha).getDay() === 2);
    const ventasMiercoles = ventas.filter(venta => new Date(venta.fecha).getDay() === 3);
    const ventasJueves = ventas.filter(venta => new Date(venta.fecha).getDay() === 4);
    const ventasViernes = ventas.filter(venta => new Date(venta.fecha).getDay() === 5);
    const ventasSabado = ventas.filter(venta => new Date(venta.fecha).getDay() === 6);
    const ventasDomingo = ventas.filter(venta => new Date(venta.fecha).getDay() === 0);
    return (
        <>
            <div className="w-full h-dvh overflow-y-scroll custom-scrollbar">
                <div className="w-full justify-center flex pt-10">
                    <h1 className="text-3xl font-bold text-black">Ventas de la semana</h1>
                </div>
                {ventasLunes.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Lunes
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
                                        {ventasLunes.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventasMartes.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Martes
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
                                        {ventasMartes.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventasMiercoles.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Miercoles
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
                                        {ventasMiercoles.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventasJueves.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Jueves
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
                                        {ventasJueves.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventasViernes.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Viernes
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
                                        {ventasViernes.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventasSabado.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="text-2xl">
                            Ventas Sabado
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
                                        {ventasSabado.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventasDomingo.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full pb-10">
                        <div className="text-2xl">
                            Ventas Domingo
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
                                        {ventasDomingo.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {ventas.length === 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full pb-10">
                        <div className="text-center text-red-500 text-3xl">No hay ventas en este rango de tiempo</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default VentasSemana;