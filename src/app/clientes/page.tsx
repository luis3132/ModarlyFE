"use client";

import ListarCliente from "@/components/cliente/listarCliente";
import Clientes from "@/components/sidecomponents/clientes";
import { useState, useEffect } from "react";

interface Cliente {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    fijo: string;
    descripcion: string;
    mayorista: boolean;
}

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cliente/list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                setClientes(data);
                setLoading(false);
            } catch (e) {
                setError("Error al cargar los clientes");
                setLoading(false);
            }
        }
        fetchClientes();
    }, [reload]);

    // Filter the clients
    const filteredClientes = clientes.filter(cliente =>
        cliente.nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cliente.cedula.includes(searchQuery)
    );

    console.log(reload);

    return (
        <>
            <Clientes setSearchQuery={setSearchQuery} setReload={()=>{setReload(!reload)}} />
            <div className={`p-10 flex-grow h-screen overflow-scroll custom-scrollbar flex flex-wrap ${loading ? "hidden" : ""} ${error && "hidden"}`}>
                {filteredClientes.map((cliente) => (
                    <ListarCliente cliente={cliente} key={cliente.cedula} />
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
        </>
    );
}