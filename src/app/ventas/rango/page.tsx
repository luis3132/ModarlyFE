"use client";

import ErrorScreen from "@/components/extra/errorScreen";
import Loading from "@/components/extra/loading";
import SideVentas from "@/components/sideComponents/ventas";
import VentasRango from "@/components/ventas/ventasRango";
import useReload from "@/lib/hooks/reload";
import { Get } from "@/lib/scripts/fetch";
import { Venta } from "@/lib/types/types";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const { ReloadContext, reload, loading, loadingUpdate } = useReload();
    const [error, setError] = useState<string>("");
    const [inicio, setInicio] = useState<string>("");
    const [fin, setFin] = useState<string>("");

    const fetchVentas = async () => {
        loadingUpdate(true);
        if (inicio && fin) {
            if (inicio <= fin) {
                try {
                    const { data } = await Get(`/api/venta/list/rango/${new Date(inicio)}/${new Date(fin)}`)
                    setVentas(data);
                    loadingUpdate(false);
                } catch (e) {
                    console.error(e);
                    loadingUpdate(false);
                    setError("Error al cargar las ventas");
                }
            } else {
                loadingUpdate(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La fecha de inicio debe ser menor o igual a la fecha de fin"
                });
            }
        } else {
            loadingUpdate(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un rango de fechas"
            });
        }
    }

    const handleInicio = (e: ChangeEvent<HTMLInputElement>) => {
        setInicio(e.target.value);
    }

    const handleFin = (e: ChangeEvent<HTMLInputElement>) => {
        setFin(e.target.value);
    }

    return (
        <ReloadContext.Provider value={{ loading, loadingUpdate() { }, reload, update: () => { } }}>
            <SideVentas key={1} />
            <div className={`w-full max-h-dvh ${!error ? "" : "hidden"} `}>
                <div className={` w-full ${!error ? "" : "hidden"}`}>
                    <div className="w-full pt-10 pb-5 px-10">
                        <div className="w-full h-min flex max-md:flex-col justify-between rounded-lg shadow-2xl px-2 py-1">
                            <div className="w-[40%] max-md:w-full items-center">
                                <label className="text-2xl font-bold w-full">Inicio</label>
                                <input title="inicio" className="w-full my-1 bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg" type="date" onChange={(e) => handleInicio(e)}></input>
                            </div>
                            <div className="w-[40%] max-md:w-full items-center">
                                <label className="text-2xl font-bold">Fin</label>
                                <input title="fin" className="w-full my-1 bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg pr-2" type="date" onChange={(e) => handleFin(e)}></input>
                            </div>
                            <button className="my-1 bg-purple-700 hover:bg-purple-900 text-white p-2 rounded-lg" onClick={fetchVentas} >Buscar</button>
                        </div>
                    </div>
                    <div className="overflow-y-scroll custom-scrollbar w-full">
                        {!loading && !error && <VentasRango ventas={ventas} />}
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <ErrorScreen error={error} />}
        </ReloadContext.Provider>
    );
}