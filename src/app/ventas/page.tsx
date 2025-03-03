"use client";

import ErrorScreen from "@/components/extra/errorScreen";
import Loading from "@/components/extra/loading";
import SideVentas from "@/components/sideComponents/ventas";
import VentasHoy from "@/components/ventas/ventasHoy";
import useReload from "@/lib/hooks/reload";
import { Get } from "@/lib/scripts/fetch";
import { Venta } from "@/lib/types/types";
import React, { useEffect, useState } from "react";

export default function Home() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const { ReloadContext, reload, loading, loadingUpdate } = useReload();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        loadingUpdate(true);
        const fetchVentas = async () => {
            try {
                const { data } = await Get("/api/venta/list/hoy");
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
            <SideVentas key={1} />
            {!loading && !error && <VentasHoy ventas={ventas} key={2} />}
            {loading && <Loading />}
            {error && <ErrorScreen error={error} />}
        </ReloadContext.Provider>
    );
}