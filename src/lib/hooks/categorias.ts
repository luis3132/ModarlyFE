import { createContext, useState } from "react";
import { Categoria } from "../types/types";

interface Context {
    categorias: Categoria[];
    setCategorias: () => void;
}

export const CategoriasContext = createContext<Context>({
    categorias: [],
    setCategorias: () => {}
});

export default function useCategorias() {
    const [categorias, setCategoria] = useState<Categoria[]>([]);

    const setCategorias = (obj: Categoria[]) => {
        setCategoria(obj);
    }

    return {categorias, setCategorias, CategoriasContext};
};