import { FC } from "react";

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface SubcategoriaSeleccionarProps {
    categorias: Categoria[];
}

const SubcategoriaSeleccionar: FC<SubcategoriaSeleccionarProps> = ({ categorias }) => {
    return (
        <>
            {categorias.map((categorias) => (
                categorias.hija &&
                <option key={categorias.hija} value={categorias.hija}>{categorias.hija}</option>
            ))}
        </>
    )
}

export default SubcategoriaSeleccionar;