import { Icon } from "@iconify/react/dist/iconify.js"
import React, { FC, use, useEffect, useState } from "react"

interface Venttall {
    venta: number;
    talla: number;
    cantidad: number;
    precioFinal: number;
}

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

interface ResumenCompraProps {
    deploy: boolean;
    setDeploy: () => void;
    venttall: Venttall[] | null;
    articulo: Articulo[];
    mayorista: boolean;
}

const ResumenCompra: FC<ResumenCompraProps> = ({ deploy, setDeploy, venttall, articulo, mayorista }) => {

    const [show, setShow] = useState(false);
    const [height, setHeight] = useState("hidden");

    const carrito = articulo.map((articulo) => {
        const find = articulo.tallas.find((talla) => {
            return talla.id === venttall?.find((venttall) => venttall.talla === talla.id)?.talla;
        })
        return find && { ...articulo, cantidad: venttall?.find((venttall) => venttall.talla === find.id)?.cantidad, talla: venttall?.find((venttall) => venttall.talla === find.id)?.talla };
    });

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        if (venttall?.length !== 0) {
            if (show) {
                setHeight("bottom-0");
            } else {
                setHeight("-bottom-[93%]");
            }
        } else {
            setHeight("-bottom-[100%]");
        }
    }, [show, venttall]);

    return (
        <>
            <div className={`min-w-64 max-w-64 shadow-lg shadow-gray-600 max-md:hidden max-h-screen bg-purple-200 ml-auto fixed top-0 h-dvh duration-500 ${deploy ? "right-0" : "-right-64"} `}>
                <div className="px-5 pt-11">
                    <div className="w-full flex justify-center items-center">
                        <div className="text-2xl flex items-center font-bold justify-center">
                            <Icon icon="mdi:cart" />
                            Carrito
                        </div>
                        <button title="close" className=" pr-1 pt-1" onClick={setDeploy}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                    </div>
                    <div className="flex flex-col">
                        {carrito?.map((articulo) => {
                            if (articulo !== undefined) {
                                return (
                                    <div className="flex flex-row border" key={articulo?.id}>
                                        <div className="flex flex-col">
                                            <div className="text-lg">{articulo?.nombre}</div>
                                            <div className="text-sm">Precio: {mayorista ? articulo?.precioMayorista * (articulo?.cantidad || 0) : articulo?.precioDetal * (articulo?.cantidad || 0)}</div>
                                            <div className="text-sm">Cantidad: {articulo?.cantidad}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full shadow-lg shadow-gray-600 md:hidden h-dvh ${height} bg-purple-200 ml-auto fixed duration-1000  `}>
                <div className="p-5">
                    <div className="w-full flex justify-center items-center mb-5">
                        <div className="text-2xl flex items-center font-bold justify-center">
                            <Icon icon="mdi:cart" />
                            Carrito
                        </div>
                        <button className={` w-7 text-2xl rounded-full border-2 text-center border-purple-600 transition-all duration-500 ${show ? "-rotate-90" : "rotate-90"} `} title="deploy" onClick={handleShow} ><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className="flex flex-col ">
                        {carrito?.map((articulo) => {
                            if (articulo !== undefined) {
                                return (
                                    <div className="flex flex-row border py-2" key={articulo?.id}>
                                        <div className="flex flex-col">
                                            <div className="text-lg">{articulo?.nombre}</div>
                                            <div className="text-sm">Precio: {mayorista ? articulo?.precioMayorista * (articulo?.cantidad || 0) : articulo?.precioDetal * (articulo?.cantidad || 0)}</div>
                                            <div className="text-sm">Cantidad: {articulo?.cantidad}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumenCompra;