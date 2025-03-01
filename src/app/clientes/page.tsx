"use client";

import Clientes from "@/components/clientes/clientes";
import SideCliente from "@/components/sideComponents/cliente";
import useReload from "@/lib/hooks/reload";
import { Get } from "@/lib/scripts/fetch";
import { Cliente } from "@/lib/types/types";
import React, { useState, useEffect } from "react";

export default function Home() {
    // States
    const [searchQuery, setSearchQuery] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Fetch the clients
    const { reload, ReloadContext, update } = useReload();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await Get("/api/cliente/list");
                setClientes(data);
                setLoading(false);
            } catch (e) {
                setError("Error al cargar los clientes: " + e);
                setLoading(false);
            }
        }
        fetchClientes();
    }, [reload]);

    // Filter the clients
    const filteredClientes = clientes.filter(cliente =>
        cliente.nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cliente.cedula.includes(searchQuery) ||
        cliente.mayorista.toString().includes(searchQuery)
    );

    return (
        <ReloadContext.Provider value={{ reload, update }}>
            <SideCliente setSearchQuery={setSearchQuery}  key={1} />
            <div className={`p-10 flex-grow h-full overflow-scroll custom-scrollbar flex flex-wrap ${loading ? "hidden" : ""} ${error && "hidden"}`}>
                {filteredClientes.map((cliente) => (
                    <Clientes cliente={cliente} key={cliente.cedula} />
                ))}
            </div>
            <div className={`p-10 flex-grow h-screen justify-center flex items-center ${loading ? "" : "hidden"}`}>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
            <div className={`p-10 flex-grow h-screen justify-center  items-center ${error ? "" : "hidden"}`}>
                <div className="error h-screen text-center">
                    <h1 className="text-4xl text-red-500">{error}</h1>
                </div>
            </div>
        </ReloadContext.Provider>
    );
}