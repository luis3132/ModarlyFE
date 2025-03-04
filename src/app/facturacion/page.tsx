"use client";

import ErrorScreen from "@/components/extra/errorScreen";
import Loading from "@/components/extra/loading";
import ResumenCompra from "@/components/facturacion/resumenCompra";
import VerArticulos from "@/components/facturacion/verArticulos";
import Facturacion from "@/components/sideComponents/facturacion";
import useCarrito from "@/lib/hooks/carrito";
import useCategorias from "@/lib/hooks/categorias";
import useReload from "@/lib/hooks/reload";
import { Get } from "@/lib/scripts/fetch";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

export default function Home() {
    // States
    const { reload, ReloadContext, loading, loadingUpdate } = useReload();
    const [error, setError] = useState<string>("");

    const { CategoriasContext, categorias, setCategorias } = useCategorias();
    const { handleAddVenttall, getColombiaTime, setVerCarrito, venta, verCarrito, handleVenta, mayorista, handleSetMayorista, handleDeleteVenttall, articulos, setArticulos, CarritoContext } = useCarrito();

    const [searchQueryPadre, setSearchQueryPadre] = useState('');
    const [searchQueryHija, setSearchQueryHija] = useState('');
    const [searchQueryArticulo, setSearchQueryArticulo] = useState('');
    const [botonCarrito, setBotonCarrito] = useState(false);

    // function to list the categories
    useEffect(() => {
        loadingUpdate(true);
        const fetchCategorias = async () => {
            try {
                const { data } = await Get("/api/articulo/list");
                setCategorias(data.categorias);
                setArticulos(data.articulos);
                loadingUpdate(false);
            } catch (e) {
                console.error(e);
                setError("Error al cargar los datos");
                loadingUpdate(false);
            }
        }
        fetchCategorias();
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

    // Function to show the buttom to hide the carrito
    useEffect(() => {
        if (venta) {
            if (venta?.venttall.length > 0) {
                setBotonCarrito(true);
            } else {
                setBotonCarrito(false);
                setVerCarrito(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venta]);

    //console.log("venttallList:", JSON.stringify(venttallList, null, 2));

    return (
        <ReloadContext.Provider value={{ reload, loading, loadingUpdate, update: () => { } }}>
            <CategoriasContext.Provider value={{ categorias, setCategorias() { } }}>
                <CarritoContext.Provider value={{ venta, setVerCarrito, verCarrito, handleAddVenttall, handleVenta, mayorista, handleSetMayorista, handleDeleteVenttall, articulos, setArticulos() { }, getColombiaTime }}>
                    <Facturacion error={error} setSearchQuery={setSearchQueryPadre} setSearchQueryA={setSearchQueryHija} key={0} />
                    <div className={`p-5 flex-grow md:max-h-dvh h-dvh overflow-hidden justify-center ${loading && "hidden"} ${error && "hidden"} `}>
                        <div className="w-full h-min shadow-2xl rounded-xl mb-2">
                            <div className="p-5 flex items-center max-md:flex-col w-full">
                                <div className="relative w-full">
                                    <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Buscar Producto"
                                        className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                                        onChange={(e) => setSearchQueryArticulo(e.target.value)}
                                    />
                                </div>
                                <button
                                    className={`bg-purple-500 max-md:w-full max-md:hidden hover:bg-purple-700 text-white rounded-lg p-2 w-52 md:ml-4 flex items-center justify-center ${!botonCarrito && "hidden"}`}
                                    onClick={() => setVerCarrito(!verCarrito)}>
                                    <Icon className="mr-1" icon="mdi:cart" />
                                    <p>Ver carrito ({(
                                        venta.venttall.reduce((acc, venttall) => acc + venttall.cantidad, 0)
                                    )})</p>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-full">
                            <div className="flex flex-wrap h-[95%] w-full px-5 overflow-y-scroll custom-scrollbar max-md:justify-center">
                                {filteredArticulos.map((articulo, index) => (
                                    <VerArticulos articulo={articulo} index={index + 2} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {loading && <Loading />}
                    {error && <ErrorScreen error={error} />}
                    {botonCarrito && <ResumenCompra key={1} />}
                </CarritoContext.Provider>
            </CategoriasContext.Provider>
        </ReloadContext.Provider>
    );
}