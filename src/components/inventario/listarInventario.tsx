import { Articulo } from "@/lib/types/types";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import VerInventario from "./verInventario";

interface InventarioProps {
    articulo: Articulo;
}

const ListarInventario: FC<InventarioProps> = ({ articulo }) => {
    const [showInventario, setShowInventario] = useState(false);
    const handleShowInventario = () => {
        setShowInventario(!showInventario);
    }

    const [background, setBackground] = useState("bg-purple-300");
    const [hoverBackground, setHoverBackground] = useState("hover:bg-purple-400");
    useEffect(() => {
        articulo.tallas.map((talla) => {
            let zero: boolean = false;
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
    }, [articulo]);

    return (
        <>
            <div className="lg:w-1/2 xl:w-1/3 p-5">
                <button className={` w-full max-h-min p-5 ${background} ${hoverBackground} rounded-lg shadow-lg`} onClick={handleShowInventario}>
                    <div key={articulo.id} className="w-full h-full">
                        <h1 className="text-2xl font-bold">{articulo.nombre}</h1>
                        <div className="mb-2 items-center justify-center w-full flex">
                            <div className=" flex rounded-xl w-fit overflow-hidden min-h-72 max-h-72 shadow-xl " >
                                <Image src="/modarly.jpeg" alt="user" className="object-cover" width={300} height={300} />
                            </div>
                        </div>
                        <div className="mt-2 text-lg">{articulo.descripcion}</div>
                    </div>
                </button>
            </div>
            {showInventario && <VerInventario closeComponent={handleShowInventario} articulo={articulo} />}
        </>
    );
};

export default ListarInventario;