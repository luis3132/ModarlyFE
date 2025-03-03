import React, { FC } from "react";
import VerVentas from "./verVentas";
import { Venta } from "@/lib/types/types";

interface VentasSemanaProps {
    ventas: Venta[];
}

const getWeekRange = (ventas: Venta[], dia: number) => {
    if (ventas.length === 0) return [];
    return ventas.filter(venta => new Date(venta.fecha).getDay() === dia);
};

const VentasSemana: FC<VentasSemanaProps> = ({ ventas }) => {
    const ventasLunes = getWeekRange(ventas, 1);
    const ventasMartes = getWeekRange(ventas, 2);
    const ventasMiercoles = getWeekRange(ventas, 3);
    const ventasJueves = getWeekRange(ventas, 4);
    const ventasViernes = getWeekRange(ventas, 5);
    const ventasSabado = getWeekRange(ventas, 6);
    const ventasDomingo = getWeekRange(ventas, 0);
    return (
        <>
            <div className="w-full h-dvh overflow-y-scroll custom-scrollbar">
                <div className="w-full justify-center flex pt-10">
                    <h1 className="text-3xl font-bold text-black">Ventas de la semana</h1>
                </div>
                {ventas.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="w-full justify-center flex pt-1">
                            <div className="w-[80%] max-md:w-full max-h-56 rounded-xl p-5 overflow-y-scroll custom-scrollbar">
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
                                        {ventasLunes.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Lunes</td>
                                            </tr>
                                        )}
                                        {ventasLunes.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {ventasMartes.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Martes</td>
                                            </tr>
                                        )}
                                        {ventasMartes.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {ventasMiercoles.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Miercoles</td>
                                            </tr>
                                        )}
                                        {ventasMiercoles.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {ventasJueves.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Jueves</td>
                                            </tr>
                                        )}
                                        {ventasJueves.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {ventasViernes.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Viernes</td>
                                            </tr>
                                        )}
                                        {ventasViernes.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {ventasSabado.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Sabado</td>
                                            </tr>
                                        )}
                                        {ventasSabado.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {ventasDomingo.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Domingo</td>
                                            </tr>
                                        )}
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
                    <div className="px-10 max-md:px-1 py-5 w-full flex h-[80%] items-center justify-center">
                        <div className="text-center text-red-500 text-3xl">No hay ventas en este rango de tiempo</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default VentasSemana;