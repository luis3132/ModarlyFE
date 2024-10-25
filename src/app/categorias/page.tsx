"use client";

import Categorias from "@/components/sidecomponents/categorias";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ListarCategoria from "@/components/categoria/listarCategoria";

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

export default function Home() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQueryPadre, setSearchQueryPadre] = useState('');
    const [searchQueryHija, setSearchQueryHija] = useState('');

    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/categoria/list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                setCategorias(data);
                setLoading(false);
            } catch (e) {
                setError("Error al cargar las categorias");
                setLoading(false);
            }
        }
        fetchCategorias();
    }, [reload]);

    const filteredCategorias = categorias.filter(categorias =>
        categorias.padre.toLowerCase().includes(searchQueryPadre.toLowerCase()) &&
        (categorias.hija?.toLowerCase() ?? '').includes(searchQueryHija.toLowerCase())
    );

    const handleReload = () => {
        setReload(!reload);
    }

    return (
        <>
            <Categorias loading={loading} error={error} setReload={handleReload} setSearchQuery={setSearchQueryPadre} categorias={categorias} key={1} />
            <div className={`p-5 flex-grow h-dvh justify-center flex flex-col ${!loading ? "" : "hidden"} ${!error ? "" : "hidden"}`}>
                <div className="w-full h-min shadow-xl mb-1 rounded-xl">
                    <div className="p-5">
                        <div className="relative">
                            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                            <input
                                type="text"
                                placeholder="Buscar SubCategoria"
                                className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                                onChange={(e) => setSearchQueryHija(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-dvh overflow-y-scroll custom-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Categoria</th>
                                <th>Subcategoria</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategorias.map((categoria, index) => (
                                <ListarCategoria key={categoria.id} categoria={categoria} index={index} setReload={handleReload} categorias={categorias} />
                            ))}
                        </tbody>
                    </table>
                </div>
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