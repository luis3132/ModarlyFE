"use client";

import Clientes from "@/components/clientes/clientes";
import ErrorScreen from "@/components/extra/errorScreen";
import Loading from "@/components/extra/loading";
import SideCliente from "@/components/sideComponents/cliente";
import useReload from "@/lib/hooks/reload";
import { Get } from "@/lib/scripts/fetch";
import { Cliente } from "@/lib/types/types";
import React, { useState, useEffect } from "react";

export default function Home() {
    // States
    const [searchQuery, setSearchQuery] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [error, setError] = useState<string>("");
    // Fetch the clients
    const { reload, ReloadContext, update, loading, loadingUpdate } = useReload();

    useEffect(() => {
        loadingUpdate(true);
        const fetchClientes = async () => {
            try {
                const { data } = await Get("/api/cliente/list");
                setClientes(data);
                loadingUpdate(false);
            } catch (e) {
                console.error(e);
                setError("Error al cargar los clientes");
                loadingUpdate(false);
            }
        }
        fetchClientes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    // Filter the clients
    const filteredClientes = clientes.filter(cliente =>
        cliente.nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cliente.cedula.includes(searchQuery) ||
        cliente.mayorista.toString().includes(searchQuery)
    );

    return (
        <ReloadContext.Provider value={{ reload, update, loading, loadingUpdate }}>
            <SideCliente setSearchQuery={setSearchQuery} key={1} />
            <div className={`p-10 flex-grow h-full overflow-scroll custom-scrollbar flex flex-wrap ${loading ? "hidden" : ""} ${error && "hidden"}`}>
                {filteredClientes.map((cliente) => (
                    <Clientes cliente={cliente} key={cliente.cedula} />
                ))}
            </div>
            {loading && <Loading />}
            {error && <ErrorScreen error={error} />}
        </ReloadContext.Provider>
    );
}