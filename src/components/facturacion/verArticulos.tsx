import React, { FC, use, useEffect, useState } from 'react';
import VerTallas from './verTalla';

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

interface verArticulosprops {
    articulo: Articulo;
    index: number;
    mayorista: boolean;
    setVenttall: (venttal: Venttall[]) => void;
    venttall: Venttall[] | null;
}

const VerArticulos: FC<verArticulosprops> = ({ articulo, index, mayorista, setVenttall, venttall }) => {

    const [showInventario, setShowInventario] = useState(false);
    const [background, setBackground] = useState("bg-purple-300");
    const [hoverBackground, setHoverBackground] = useState("hover:bg-purple-400");
    const [totalTallas, setTotalTallas] = useState<number>();

    useEffect(() => {
        var total: number = 0;
        var zero: boolean = false;
        articulo.tallas.map((talla) => {
            total += talla.cantidad;
            if (talla.cantidad <= 3 && !zero) {
                setBackground("bg-yellow-300");
                setHoverBackground("hover:bg-yellow-400");
                if (talla.cantidad <= 0) {
                    setBackground("bg-red-400");
                    setHoverBackground("hover:bg-red-500");
                    zero = true;
                }
            }
        });
        setTotalTallas(total);
    }, [articulo]);

    const handleShowInventario = () => {
        setShowInventario(!showInventario);
    }

    return (
        <>
            <div key={index} className=" lg:w-1/2 xl:w-1/3 p-2">
                <button className={`${background} ${hoverBackground} w-full rounded-lg p-5`} onClick={handleShowInventario}>
                    <h1 className="text-center text-2xl font-bold">{articulo.nombre}</h1>
                    <div className="mb-2 items-center justify-center w-full flex">
                        <div className=" flex rounded-xl w-fit overflow-hidden min-h-72 max-h-72 shadow-xl " >
                            <img src="/modarly.jpeg" alt="user" className="object-cover h-72" />
                        </div>
                    </div>
                    <p className="text-center text-lg font-bold">
                        {mayorista ? <>{articulo.precioMayorista}</> : <>{articulo.precioDetal}</>}
                    </p>
                    <div className="w-full flex">
                        <div className="w-[60%] p-2 flex">
                            <p className="text-lg">{totalTallas} unidades</p>
                        </div>
                        <div className="w-[40%] p-2 items-center">
                            <p className="text-xl font-bold">Agregar</p>
                        </div>
                    </div>
                </button>
            </div>
            {showInventario && <VerTallas key={articulo.id} venttall={venttall} setVenttall={setVenttall} articulo={articulo} closeComponent={handleShowInventario} />}
        </>
    )
}

export default VerArticulos;