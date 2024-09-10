"use client";

import Inventario from "@/components/sidecomponents/inventario";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface Talla {
    id: number;
    articulo: number;
    talla: string;
    cantidad: number;
}

interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    categorias: Categoria[];
    tallas: Talla[];
}

export default function Home() {
    // States
    const [loading, setLoading] = useState(true);
    const [loadingCategorias, setLoadingCategorias] = useState(true);
    const [loadingArticulos, setLoadingArticulos] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errorCategorias, setErrorCategorias] = useState<string | null>(null);
    const [errorArticulos, setErrorArticulos] = useState<string | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [searchQueryPadre, setSearchQueryPadre] = useState('');
    const [searchQueryHija, setSearchQueryHija] = useState('');
    const [searchQueryArticulo, setSearchQueryArticulo] = useState('');
    // function to list the categories
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
                setLoadingCategorias(false);
            } catch (e) {
                setErrorCategorias("Error al cargar las categorias");
                setLoadingCategorias(false);
            }
        }
        fetchCategorias();
    }, []);
    // function to list the articles
    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articulo/list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                setArticulos(data);
                setLoadingArticulos(false);
            } catch (e) {
                setErrorArticulos("Error al cargar los articulos");
                setLoadingArticulos(false);
            }
        }
        fetchArticulos();
    }, [categorias]);
    // function to finish loading
    useEffect(() => {
        if (!loadingArticulos && !loadingCategorias) {
            setLoading(false);
        }
    }, [loadingArticulos, loadingCategorias]);
    // function to set error
    useEffect(() => {
        if (errorCategorias && errorArticulos) {
            setError(errorCategorias + " y " + errorArticulos);
        } else if (errorCategorias) {
            setError(errorCategorias);
        } else if (errorArticulos) {
            setError(errorArticulos);
        }
    }, [errorCategorias, errorArticulos]);

    const filteredArticulos = articulos.filter(articulo =>
        articulo.nombre.toLowerCase().includes(searchQueryArticulo.toLowerCase()) &&
        articulo.categorias.some(categoria =>
            categoria.padre.toLowerCase().includes(searchQueryPadre.toLowerCase()) &&
            (categoria.hija?.toLowerCase() ?? '').includes(searchQueryHija.toLowerCase())
        )
    );

    console.log(filteredArticulos);

    return (
        <>
            <Inventario categorias={categorias} loading={loadingCategorias} error={errorCategorias} setSearchQuery={setSearchQueryPadre} setSearchQueryA={setSearchQueryArticulo} />
            <div className={`p-5 flex-grow h-screen justify-center overflow-y-scroll custom-scrollbar ${!loading ? "" : "hidden"}`}>
                <div className="w-full h-min">
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
                <div className="flex flex-wrap flex-grow">
                    {filteredArticulos.map((articulo, index) => (
                        <div key={articulo.id} className="w-full p-5 bg-purple-300 hover:bg-purple-400 rounded-lg mb-5">
                            <h1 className="text-2xl font-bold">{articulo.nombre}</h1>
                            <p>{articulo.descripcion}</p>
                            <p>{articulo.precioDetal}</p>
                            <p>{articulo.precioMayorista}</p>
                            <p>{articulo.categorias.map(categoria => categoria.padre + " " + categoria.hija).join(", ")}</p>
                            <p>{articulo.tallas.map(talla => talla.talla + " " + talla.cantidad).join(", ")}</p>
                        </div>
                    ))}
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