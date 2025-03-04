import { Venta } from "@/lib/types/types";
import React, { FC } from "react";
import VerVentas from "./verVentas";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { LocalPost } from "@/lib/scripts/fetch";

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

    const handlePrint = () => {
        Swal.fire({
            title: 'Imprimir reporte de ventas',
            text: 'Desear imprimir el reporte de ventas de hoy?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563EB',
            cancelButtonColor: '#FF0000'
        }).then(async result => {
            if (result.isConfirmed) {
                if (ventas.length > 0) {
                    const { data } = await LocalPost('/api/ventasHoy/print', ventas);
                    if (data.success) {
                        Swal.fire({
                            title: 'Reporte de ventas',
                            text: 'El reporte de ventas se ha impreso correctamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#2563EB'
                        });
                    } else {
                        Swal.fire({
                            title: 'Reporte de ventas',
                            text: 'Error al imprimir el reporte de ventas',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#2563EB'
                        });
                    }
                    return;
                }
                Swal.fire({
                    title: 'Reporte de ventas',
                    text: 'No hay ventas registradas el dia de hoy',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#2563EB'
                });
            }
        });
    };

    return (
        <>
            <div className="w-full h-dvh overflow-y-scroll custom-scrollbar">
                <div className="w-full justify-center flex pt-10">
                    <h1 className="text-3xl font-bold text-black">Ventas de hoy</h1>
                </div>
                {ventas.length > 0 && (
                    <div className="px-10 max-md:px-1 py-5 w-full">
                        <div className="w-full justify-center flex pt-1">
                            <div className="w-[80%] max-md:w-full bg-gray-200 max-h-[85%] rounded-xl p-5 overflow-y-scroll custom-scrollbar">
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
                                        {madrugadaVentas.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas madrugada</td>
                                            </tr>
                                        )}
                                        {madrugadaVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {mananaVentas.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas mañana</td>
                                            </tr>
                                        )}
                                        {mananaVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {tardeVentas.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas tarde</td>
                                            </tr>
                                        )}
                                        {tardeVentas.map((venta, i) => (
                                            <VerVentas key={i} index={i} venta={venta} />
                                        ))}
                                        {nocheVentas.length > 0 && (
                                            <tr className="w-full text-center">
                                                <td colSpan={6}>Ventas Noche</td>
                                            </tr>
                                        )}
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
                    <div className="px-10 max-md:px-1 py-5 w-full flex h-[80%] items-center justify-center">
                        <div className="text-center text-red-500 text-3xl">No hay ventas registradas el Dia de hoy</div>
                    </div>
                )}
            </div>
            <button
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 w-14 h-14 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                onClick={handlePrint}>
                <Icon icon="rivet-icons:printer" width="24" height="24" />
            </button>
        </>
    )
}

export default VentasHoy;