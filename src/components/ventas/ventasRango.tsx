import React, { FC } from "react";
import VerVentas from "./verVentas";
import { Venta } from "@/lib/types/types";

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
                    <div className="w-full justify-center flex pt-1 max-h-[80%] overflow-y-scroll custom-scrollbar">
                        <div className="w-[80%] max-md:w-full rounded-xl p-5">
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