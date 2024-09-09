import { FC, useState } from "react";
import CrearCategoria from "../categoria/crearCategoria";
import { Icon } from "@iconify/react/dist/iconify.js";


interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface CategoriasProps {
    setReload: () => void;
    setSearchQuery: (query: string) => void;
    categorias: Categoria[];
    loading?: boolean;
    error?: string | null;
}

const Categorias: FC<CategoriasProps> = ({ setReload, setSearchQuery, categorias, loading, error }) => {

    const [showAddCategoria, setShowAddCategoria] = useState(false);
    const [deploy, setDeploy] = useState(false);

    const handleAddCategoria = () => {
        setShowAddCategoria(!showAddCategoria);
    }

    const uniqueCategorias = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre)
    );

    return (
        <>
            <div className="w-64 shadow-lg shadow-gray-600 max-md:hidden max-h-screen overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCategoria}>Agregar Categoria</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <h1 className="text-center text-2xl font-bold">Categorias</h1>
                    <button className="p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() => setSearchQuery("")}>Todas</button>
                    {uniqueCategorias.map((categoria) => (
                        <button className="p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md" key={categoria.id} onClick={() => setSearchQuery(`${categoria.padre}`)}>{categoria.padre}</button>
                    ))}
                    <div className={`p-10 flex-grow h-20 justify-center flex items-center ${loading ? "" : "hidden"}`}>
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                    <div className={`p-10 flex-grow h-20 justify-center  items-center ${error ? "" : "hidden"}`}>
                        <div className="error h-screen text-center">
                            <h1 className="text-4xl text-red-500">{error}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full shadow-lg shadow-gray-600 md:hidden max-h-screen overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="px-5 pt-5">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCategoria}>Agregar Categoria</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <div className="flex w-full justify-between">
                        <h1 className="text-center text-2xl font-bold">Categorias</h1>
                        <button className={` w-8 text-2xl rounded-full border-2 text-center border-purple-600 duration-500 ${deploy ? "-rotate-90" : ""} `} title="deploy" onClick={()=> setDeploy(!deploy)}><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className={`${deploy ? "" : "hidden"}`}>
                        <button className="p-2 mb-1 mt-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() => {setSearchQuery(""); setDeploy(!deploy)}}>Todas</button>
                        {uniqueCategorias.map((categoria) => (
                            <button className="p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md" key={categoria.id} onClick={() => {setSearchQuery(`${categoria.padre}`); setDeploy(!deploy);}}>{categoria.padre}</button>
                        ))}
                    </div>
                    <div className={`p-10 flex-grow h-20 justify-center flex items-center ${loading ? "" : "hidden"}`}>
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                    <div className={`p-10 flex-grow h-20 justify-center  items-center ${error ? "" : "hidden"}`}>
                        <div className="error h-screen text-center">
                            <h1 className="text-4xl text-red-500">{error}</h1>
                        </div>
                    </div>
                </div>
            </div>
            {showAddCategoria && (
                <CrearCategoria closeComponent={handleAddCategoria} setReload={setReload} categoriasPadre={uniqueCategorias} />
            )}
        </>
    )
}

export default Categorias;