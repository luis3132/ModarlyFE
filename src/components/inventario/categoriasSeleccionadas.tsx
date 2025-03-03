import React, { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Categoria } from "@/lib/types/types";


interface CategoriaSeleccionadaProps {
    categoria: number;
    categorias: Categoria[];
    eliminarCategoria: (id:number) => void;
}

const CategoriaSeleccionada: FC<CategoriaSeleccionadaProps> = ({ categoria, eliminarCategoria, categorias }) => {
    const seleccionada = categorias.find((cat) => cat.id === categoria);
    return (
        <>
            <div key={seleccionada?.id} className="flex h-min justify-between items-center w-min p-1">
                <div>{seleccionada?.padre}</div>
                <div className="mx-1">-</div>
                <div>{seleccionada?.hija}</div>
                <button title={`${seleccionada?.id}`} className="justify-center text-lg flex items-center bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => eliminarCategoria(categoria)} >
                    <Icon icon="material-symbols:delete-outline" />
                </button>
            </div>
        </>
    )
}

export default CategoriaSeleccionada;