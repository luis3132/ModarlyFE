import React, { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface CategoriaSeleccionadaProps {
    categoria: Categoria;
    eliminarCategoria: (id:number) => void;
}

const CategoriaSeleccionada: FC<CategoriaSeleccionadaProps> = ({ categoria, eliminarCategoria }) => {
    return (
        <>
            <div key={categoria.id} className="flex h-min justify-between items-center w-min p-1">
                <div>{categoria.padre}</div>
                <div className="mx-1">-</div>
                <div>{categoria.hija}</div>
                <button title={`${categoria.id}`} className="justify-center text-lg flex items-center bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => eliminarCategoria(categoria.id)} >
                    <Icon icon="material-symbols:delete-outline" />
                </button>
            </div>
        </>
    )
}

export default CategoriaSeleccionada;