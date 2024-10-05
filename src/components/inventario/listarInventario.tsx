import React, { FC, useState } from "react";
import VerInventario from "./verInventario";


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

interface InventarioProps {
    categorias: Categoria[];
    articulo: Articulo;
    reload: () => void;
}

const ListarInventario: FC<InventarioProps> = ({ articulo, categorias, reload }) => {
    const [showInventario, setShowInventario] = useState(false);
    const handleShowInventario = () => {
        setShowInventario(!showInventario);
    }
    return (
        <>
            <button className="max-w-sm min-w-52 max-h-min p-5 bg-purple-300 hover:bg-purple-400 rounded-lg mx-2 mb-5 shadow-lg" onClick={handleShowInventario}>
                <div key={articulo.id} className="w-full h-full">
                    <h1 className="text-2xl font-bold">{articulo.nombre}</h1>
                    <div className="rounded-xl overflow-hidden max-h-72" >
                        <img src="/hello-kitty-pictures-xeulf538v4jogtue.jpg" alt="user" width="w-full" height={200} />
                    </div>
                    <div className="mt-2 text-lg">{articulo.descripcion}</div>
                </div>
            </button>
            {showInventario && <VerInventario reload={reload} closeComponent={handleShowInventario} articulo={articulo} categorias={categorias} />}
        </>
    );
};

export default ListarInventario;