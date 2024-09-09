import { FC } from "react";

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface CategoriasProps {
    categoria: Categoria;
    index: number;
}

const ListarCategoria: FC<CategoriasProps> = ({categoria, index}) => {

    return (
        <>
            <tr className={`h-12 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"}`} key={categoria.id}>
                <td className="text-center">{categoria.id}</td>
                <td className="text-center">{categoria.padre}</td>
                <td className="text-center">{categoria.hija}</td>
                <td className="text-center justify-between">
                    <button className="bg-green-400 hover:bg-green-500 text-white rounded-lg p-1">Editar</button>
                    <button className="bg-red-400 hover:bg-red-500 text-white rounded-lg p-1">Eliminar</button>
                </td>
            </tr>
        </>
    );
}

export default ListarCategoria;