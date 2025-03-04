import React, { FC, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Articulo } from '@/lib/types/types';
import { CarritoContext } from '@/lib/hooks/carrito';
import VerTallas from './verTalla';

interface verArticulosprops {
    articulo: Articulo;
    index: number;
}

const VerArticulos: FC<verArticulosprops> = ({ articulo, index }) => {

    const { mayorista } = useContext(CarritoContext);

    const [showInventario, setShowInventario] = useState(false);
    const [background, setBackground] = useState("bg-purple-300");
    const [hoverBackground, setHoverBackground] = useState("hover:bg-purple-400");
    const [totalTallas, setTotalTallas] = useState<number>();

    useEffect(() => {
        let total: number = 0;
        let zero: boolean = false;
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
                            <Image src="/modarly.jpeg" alt="user" className="object-cover" width={300} height={300} />
                        </div>
                    </div>
                    <p className="text-center text-lg font-bold">
                        {mayorista ? <>${articulo.precioMayorista}</> : <>${articulo.precioDetal}</>}
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
            {showInventario && <VerTallas key={articulo.id} articulo={articulo} closeComponent={handleShowInventario} />}
        </>
    )
}

export default VerArticulos;