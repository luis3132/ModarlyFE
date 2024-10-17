"use client";

import VerArticulos from "@/components/facturacion/verArticulos";
import ResumenCompra from "@/components/sidecomponents/resumenCompra";
import Vender from "@/components/sidecomponents/vender";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ChangeEvent, useEffect, useState } from "react";

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

interface Venttall {
    venta: number;
    talla: number;
    cantidad: number;
    precioFinal: number;
}

interface Venta {
    fecha: Date;
    cliente: string;
    pagacon: number | "";
    vueltos: number | "";
    metodoDePago: string;
}

interface VentaCreada {
    id: number;
    fecha: Date;
    cliente: string;
    pagacon: number;
    vueltos: number;
    metodoDePago: string;
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
    const [venttallList, setVenttallList] = useState<Venttall[]>([]);
    const [VentaCreada, setVentaCreada] = useState<VentaCreada | null>(null);
    const [tallasActualizar, setTallasActualizar] = useState<Talla[]>([]);

    const [searchQueryPadre, setSearchQueryPadre] = useState('');
    const [searchQueryHija, setSearchQueryHija] = useState('');
    const [searchQueryArticulo, setSearchQueryArticulo] = useState('');
    const [reload, setReload] = useState(false);
    const [verCarrito, setVerCarrito] = useState(false);
    const [deploy, setDeploy] = useState(false);
    const [mayorista, setMayorista] = useState(false);

    const [venta, setVenta] = useState<Venta>({
        fecha: new Date(),
        cliente: "",
        pagacon: "",
        vueltos: "",
        metodoDePago: ""
    });

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
    }, [categorias, reload]);
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

    // function to filter the articles
    const filteredArticulos = articulos.filter(articulo =>
        articulo.nombre.toLowerCase().includes(searchQueryArticulo.toLowerCase()) &&
        articulo.categorias.some(categoria =>
            categoria.padre.toLowerCase().includes(searchQueryPadre.toLowerCase()) &&
            (categoria.hija?.toLowerCase() ?? '').includes(searchQueryHija.toLowerCase())
        )
    );

    // Function to set other prices
    const handleSetMayorista = () => {
        setMayorista(!mayorista);
    }

    // Function to show the carrito
    const handleCarrito = () => {
        setDeploy(!deploy);
    }

    // Function to show the buttom to hide the carrito
    useEffect(() => {
        if (venttallList.length > 0) {
            setVerCarrito(true);
        }
    }, [venttallList]);

    // Function to add venttall to the list
    const handleAddVenttall = (venttall: Venttall[]) => {
        const updatedVenttallList = venttallList.map((item) => {
            const newItem = venttall.find((v) => v.talla === item.talla);
            return newItem ? newItem : item;
        });

        venttall.forEach((newItem) => {
            if (!updatedVenttallList.some((item) => item.talla === newItem.talla)) {
                updatedVenttallList.push(newItem);
            }
        });

        setVenttallList(updatedVenttallList);
    }

    //console.log("venttallList:", JSON.stringify(venttallList, null, 2));

    return (
        <>
            <Vender categorias={categorias} loading={loadingCategorias} error={errorCategorias} setSearchQuery={setSearchQueryPadre} setSearchQueryA={setSearchQueryHija} mayorista={mayorista} setMayorista={handleSetMayorista} key={1} />
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
                        <button className={`bg-purple-500 max-md:w-full max-md:hidden hover:bg-purple-700 text-white rounded-lg p-2 w-52 md:ml-4 flex items-center justify-center ${!verCarrito && "hidden"}`} onClick={handleCarrito}>
                            <Icon className="mr-1" icon="mdi:cart" />
                            <p>Ver carrito ({(
                                venttallList.reduce((acc, venttall) => acc + venttall.cantidad, 0)
                            )})</p>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="flex flex-wrap h-[95%] w-full px-5 overflow-y-scroll custom-scrollbar">
                        {filteredArticulos.map((articulo, index) => (
                            <VerArticulos venttall={venttallList} setVenttall={handleAddVenttall} articulo={articulo} index={index} mayorista={mayorista} key={index} />
                        ))}
                    </div>
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
            <ResumenCompra mayorista={mayorista} articulo={articulos} venttall={venttallList} setDeploy={handleCarrito} deploy={deploy} key={2} />
        </>
    );
}