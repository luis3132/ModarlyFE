import { createContext, useState } from "react";
import { Articulo, VentaCreate, VenttallCreate } from "../types/types";

interface Context {
    venta: VentaCreate;
    handleVenta: (obj: object) => void;
    verCarrito: boolean;
    mayorista: boolean;
    setVerCarrito: (value: boolean) => void;
    handleSetMayorista: () => void;
    handleAddVenttall: (venttall: VenttallCreate[]) => void;
    handleDeleteVenttall: (talla: number) => void;
    articulos: Articulo[];
    setArticulos: (obj: Articulo[]) => void;
    getColombiaTime: () => string;
}

export const CarritoContext = createContext<Context>({
    venta: {} as VentaCreate,
    handleVenta: () => {},
    verCarrito: false,
    mayorista: false,
    setVerCarrito: () => {},
    handleSetMayorista: () => {},
    handleAddVenttall: () => {},
    handleDeleteVenttall: () => {},
    articulos: [],
    setArticulos: () => {},
    getColombiaTime: () => ""
});

export default function useCarrito() {
    const [venta, setVenta] = useState<VentaCreate>({
        venttall: [],
        fecha: "",
        cliente: "",
        pagacon: 0,
        vueltos: 0,
        metodoDePago: ""
    });
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [verCarrito, setVerCarrito] = useState(false);
    const [mayorista, setMayorista] = useState(false);

    const handleSetMayorista = () => {
        setMayorista(!mayorista);
    }

    const handleVenta = (obj: object) => {
        setVenta({
            ...venta,
            ...obj
        });
    }

    const handleVenttall = (obj: VenttallCreate[]) => {
        if (obj) {
            setVenta({
                ...venta,
                venttall: obj,
                cliente: venta?.cliente || "",
                pagacon: venta?.pagacon || 0,
                vueltos: venta?.vueltos || 0,
                metodoDePago: venta?.metodoDePago || ""
            });
        }
    }

    const handleAddVenttall = (venttall: VenttallCreate[]) => {
        const updatedVenttallList = venta?.venttall.map((item) => {
            const newItem = venttall.find((v) => v.talla === item.talla);
            return newItem ? newItem : item;
        });

        if (updatedVenttallList) {
            venttall.forEach((newItem) => {
                if (!updatedVenttallList.some((item) => item.talla === newItem.talla)) {
                    updatedVenttallList.push(newItem);
                }
            });
            handleVenttall(updatedVenttallList);
        }
    }

    const handleDeleteVenttall = (talla: number) => {
        const updatedVenttallList = venta?.venttall.filter((item) => item.talla !== talla);
        if (updatedVenttallList) {
            handleVenttall(updatedVenttallList);
        }
    }

    const getColombiaTime = () => {
        const londonDate = new Date();
        return londonDate.getFullYear() + "-" + (londonDate.getMonth() + 1) + "-" + londonDate.getDate() + "T" + londonDate.getHours() + ":" + londonDate.getMinutes() + ":" + londonDate.getSeconds();
    };

    return { venta, handleVenta, verCarrito, mayorista, getColombiaTime, setVerCarrito, handleSetMayorista, handleAddVenttall, handleDeleteVenttall, articulos, setArticulos, CarritoContext };
}