"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Get } from "@/lib/scripts/fetch";
import { Articulo } from "@/lib/types/types";
import useReload from "@/lib/hooks/reload";
import Loading from "@/components/extra/loading";
import ErrorScreen from "@/components/extra/errorScreen";
import useCategorias from "@/lib/hooks/categorias";
import Inventario from "@/components/sideComponents/inventario";
import ListarInventario from "@/components/inventario/listarInventario";

export default function Home() {
    // Contexts
    const { loading, reload, ReloadContext, loadingUpdate } = useReload();
    const { categorias, setCategorias, CategoriasContext } = useCategorias();
    // States
    const [error, setError] = useState<string | null>(null);
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [searchQueryPadre, setSearchQueryPadre] = useState('');
    const [searchQueryHija, setSearchQueryHija] = useState('');
    const [searchQueryArticulo, setSearchQueryArticulo] = useState('');

    // function to list the categories and articles
    useEffect(() => {
        loadingUpdate(true);
        const fetch = async () => {
            try {
                const { data, status } = await Get("/api/articulo/list");
                if (status === 200) {
                    setArticulos(data.articulos);
                    setCategorias(data.categorias);
                    return;
                }
                setError("Error al cargar los datos");
            } catch (error) {
                console.error(error);
                setError("Error al cargar los datos");
            }
        };
        fetch();
        loadingUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    // function to filter the articles
    const filteredArticulos = articulos.filter(articulo =>
        articulo.nombre.toLowerCase().includes(searchQueryArticulo.toLowerCase()) &&
        articulo.categorias.some(categoria =>
            categoria.padre.toLowerCase().includes(searchQueryPadre.toLowerCase()) &&
            (categoria.hija?.toLowerCase() ?? '').includes(searchQueryHija.toLowerCase())
        )
    );

    return (
        <ReloadContext.Provider value={{ reload, loading, loadingUpdate, update: () => { } }}>
            <CategoriasContext.Provider value={{ categorias, setCategorias() { } }}>
                <Inventario error={error} setSearchQuery={setSearchQueryPadre} setSearchQueryA={setSearchQueryHija} key={1} />
                <div className={`p-5 flex-grow md:max-h-dvh h-dvh overflow-hidden justify-center ${!loading ? "" : "hidden"} ${!error ? "" : "hidden"} `}>
                    <div className="w-full h-min shadow-2xl rounded-xl">
                        <div className="p-5">
                            <div className="relative">
                                <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                                <input
                                    type="text"
                                    placeholder="Buscar Producto"
                                    className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                                    onChange={(e) => setSearchQueryArticulo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[93%]">
                        <div className="flex flex-wrap max-h-[100%] w-full px-5 overflow-y-scroll custom-scrollbar max-md:justify-center">
                            {filteredArticulos.map((articulo) => (
                            <ListarInventario articulo={articulo} key={articulo.id} />
                        ))}
                        </div>
                    </div>
                </div>
                {loading && <Loading />}
                {error && <ErrorScreen error={error} />}
            </CategoriasContext.Provider>
        </ReloadContext.Provider>
    );
}