"use client";

import ErrorScreen from "@/components/extra/errorScreen";
import Loading from "@/components/extra/loading";
import SideVentas from "@/components/sideComponents/ventas";
import VentasSemana from "@/components/ventas/ventasSemana";
import useReload from "@/lib/hooks/reload";
import { Get } from "@/lib/scripts/fetch";
import { Venta } from "@/lib/types/types";
import React, { useEffect, useState } from "react";

const getWeekRange = () => {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const lastDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
    return { firstDay, lastDay };
};

export default function Home() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const { ReloadContext, reload, loading, loadingUpdate } = useReload();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        loadingUpdate(true);
        const fetchVentas = async () => {
            try {
                const { firstDay, lastDay } = getWeekRange();
                const { data } = await Get(`/api/venta/list/semana/${firstDay}/${lastDay}`);
                setVentas(data);
                loadingUpdate(false);
            } catch (e) {
                console.error(e);
                loadingUpdate(false);
                setError("Error al cargar las ventas");
            }
        }
        fetchVentas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ReloadContext.Provider value={{ loading, loadingUpdate() { }, reload, update: () => { } }}>
            <SideVentas key={0} />
            {!loading && !error && <VentasSemana ventas={ventas} key={1} />}
            {loading && <Loading />}
            {error && <ErrorScreen error={error} />}
        </ReloadContext.Provider>
    );
}