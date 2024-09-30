"use client";

import Ventas from "@/components/sidecomponents/ventas";
import VentasRango from "@/components/ventas/ventasRango";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Cliente {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    fijo: string;
    descripcion: string;
    mayorista: boolean;
    fechaCreacion: Date;
}

interface Articate {
    id: {
        articulo: number;
        categoria: number;
    }
}

interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    articate: Articate;
}

interface Talla {
    id: number;
    talla: string;
    cantidad: number;
    articulo: Articulo;
}

interface Venttall {
    id: {
        venta: number;
        talla: number;
    },
    cantidad: number;
    precioFinal: number;
    talla: Talla;
}

interface Venta {
    id: number;
    cliente: Cliente;
    fecha: Date;
    pagacon: number;
    vueltos: number;
    venttall: Venttall[];
}

export default function Home() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inicio, setInicio] = useState<string | null>(null);
    const [fin, setFin] = useState<string | null>(null);

    const fetchVentas = async () => {
        setLoading(true);
        if (inicio && fin) {
            if (inicio <= fin) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/venta/list/rango/${inicio}/${fin}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await res.json();
                    setVentas(data);
                    setLoading(false);
                } catch (e) {
                    setLoading(false);
                    setError("Error al cargar las ventas");
                }
            } else {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La fecha de inicio debe ser menor o igual a la fecha de fin"
                });
            }
        } else {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un rango de fechas"
            });
        }
    }

    const handleInicio = (e: ChangeEvent<HTMLInputElement>) => {
        setInicio(e.target.value);
    }

    const handleFin = (e: ChangeEvent<HTMLInputElement>) => {
        setFin(e.target.value);
    }

    return (
        <>
            <Ventas />
            <div className={`w-full h-dvh ${!error ? "" : "hidden"} `}>
                <div className={` w-full ${!error ? "" : "hidden"}`}>
                    <div className="w-full pt-10 pb-5 px-10 flex max-md:flex-col justify-between">
                        <div className="w-[40%] max-md:w-full items-center">
                            <label className="text-2xl font-bold w-full">Inicio</label>
                            <input title="inicio" className="w-full my-1 bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg" type="date" onChange={(e) => handleInicio(e)}></input>
                        </div>
                        <div className="w-[40%] max-md:w-full items-center">
                            <label className="text-2xl font-bold">Fin</label>
                            <input title="fin" className="w-full my-1 bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg pr-2" type="date" onChange={(e) => handleFin(e)}></input>
                        </div>
                        <button className="my-1 bg-purple-700 hover:bg-purple-900 text-white p-2 rounded-lg" onClick={fetchVentas} >Buscar</button>
                    </div>
                    <div className="overflow-y-scroll custom-scrollbar w-full">
                        {!loading && !error && VentasRango({ ventas })}
                    </div>
                </div>
            </div>
            <div className={`w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-20 ${loading ? "" : "hidden"}`}>
                <div className={`p-10 flex-grow h-screen justify-center flex items-center`}>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
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