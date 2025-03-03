import { Categoria } from "@/lib/types/types";
import React, { FC } from "react";

interface SubcategoriaSeleccionarProps {
    categorias: Categoria[];
}

const SeleccionarSubCategoria: FC<SubcategoriaSeleccionarProps> = ({ categorias }) => {
    return (
        <>
            {categorias.map((categorias) => (
                categorias.hija &&
                <option key={categorias.hija} value={categorias.hija}>{categorias.hija}</option>
            ))}
        </>
    )
}

export default SeleccionarSubCategoria;