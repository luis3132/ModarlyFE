import { FC } from "react";


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
    articulo: Articulo;
}

const ListarInventario: FC<InventarioProps> = ({ articulo }) => {
    return (
        <>
            <div key={articulo.id} className="max-w-sm min-w-50 max-h-min p-5 bg-purple-300 hover:bg-purple-400 rounded-lg mx-2 mb-5 shadow-lg">
                <h1 className="text-2xl font-bold">{articulo.nombre}</h1>
                <div className="rounded-xl overflow-hidden" >
                    <img src="/hello-kitty-pictures-xeulf538v4jogtue.jpg" alt="user" width="w-full" height={200} />
                </div>
                <div className="mt-2 text-lg">{articulo.descripcion}</div>
            </div>
        </>
    );
};

export default ListarInventario;