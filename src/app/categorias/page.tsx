"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SideCategorias from "@/components/sideComponents/categoria";
import { Get } from "@/lib/scripts/fetch";
import useReload from "@/lib/hooks/reload";
import Loading from "@/components/extra/loading";
import ErrorScreen from "@/components/extra/errorScreen";
import useCategorias from "@/lib/hooks/categorias";
import ListarCategoria from "@/components/categorias/listarCategorias";

export default function Home() {
    const { categorias, setCategorias, CategoriasContext } = useCategorias();
    const [error, setError] = useState<string | null>(null);
    const [searchQueryPadre, setSearchQueryPadre] = useState('');
    const [searchQueryHija, setSearchQueryHija] = useState('');

    const { reload, ReloadContext, update, loading, loadingUpdate } = useReload();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const { data } = await Get("/api/categoria/list");
                setCategorias(data);
                loadingUpdate(false);
            } catch (e) {
                console.error(e);
                setError("Error al cargar las categorias");
                loadingUpdate(false);
            }
        }
        fetchCategorias();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const filteredCategorias = categorias.filter(categorias =>
        categorias.padre.toLowerCase().includes(searchQueryPadre.toLowerCase()) &&
        (categorias.hija?.toLowerCase() ?? '').includes(searchQueryHija.toLowerCase())
    );

    return (
        <ReloadContext.Provider value={{ reload, update, loading, loadingUpdate }}>
            <CategoriasContext.Provider value={{ categorias, setCategorias() { } }}>
                <SideCategorias error={error} setSearchQuery={setSearchQueryPadre} key={1} />
                <div className={`p-5 flex-grow max-h-dvh items-center flex flex-col ${!loading ? "" : "hidden"} ${!error ? "" : "hidden"}`}>
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
                    <div className="mt-4 w-full max-h-[90%] overflow-y-scroll custom-scrollbar">
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
                                    <ListarCategoria key={categoria.id} categoria={categoria} index={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {loading && <Loading />}
                {error && <ErrorScreen error={error} />}
            </CategoriasContext.Provider>
        </ReloadContext.Provider>
    );
}