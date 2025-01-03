"use client";

import Ventas from "@/components/sidecomponents/ventas";
import VentasSemana from "@/components/ventas/ventasSemana";
import React, { use, useEffect, useState } from "react";

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

const getWeekRange = () => {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const lastDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
    return { firstDay, lastDay };
};

export default function Home() {

    const [ventas, setVentas] = useState<Venta[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const { firstDay, lastDay } = getWeekRange();
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/venta/list/semana/${firstDay.toISOString().split('T')[0]}/${lastDay.toISOString().split('T')[0]}`, {
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
        }
        fetchVentas();
    }, []);

    return (
        <>
            <Ventas key={1} />
            {!loading && !error && <VentasSemana ventas={ventas} key={1} />}
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