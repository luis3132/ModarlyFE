import { Icon } from "@iconify/react/dist/iconify.js"
import React, { FC, useState } from "react";
import CrearInventario from "../inventario/crearInventario";

interface categoria {
    id: number;
    padre: string;
    hija: string;
};

interface inventarioprops {
    categorias: categoria[];
    loading?: boolean;
    error: string | null;
    setSearchQuery: (query: string) => void;
    setSearchQueryA: (query: string) => void;
    reload: () => void;
}

const Inventario: FC<inventarioprops> = ({ categorias, loading, error, setSearchQuery, setSearchQueryA, reload }) => {

    const [deploy, setDeploy] = useState(false);
    const [activeButton, setActiveButton] = useState("");
    const [showAddProducto, setShowAddProducto] = useState(false);

    const handleAddProducto = () => {
        setShowAddProducto(!showAddProducto);
    }

    const uniqueCategorias = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre)
    );

    const handleButtonClick = (categoria: string) => {
        if (categoria != "e") {
            setSearchQuery(categoria); // Update search query
            setActiveButton(categoria); // Update active button state
        } else {
            setSearchQuery(""); // Update search query
            setActiveButton("e"); // Update active button state
        }
    };

    return (
        <>
            <div className="min-w-80 max-w-80 shadow-lg shadow-gray-600 max-md:hidden max-h-dvh overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddProducto}>Agregar producto</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <h1 className="text-center text-2xl font-bold">Categorias</h1>
                    <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "e" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("e")}>Todas</button>
                    {uniqueCategorias.map((categoria) => (
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === categoria.padre ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} key={categoria.id} onClick={() => handleButtonClick(categoria.padre)}>{categoria.padre}</button>
                    ))}
                    <h1 className="text-center mt-4 text-2xl font-bold">SubCategoria</h1>
                    <div className="relative">
                        <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar SubCategoria"
                            className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                            onChange={(e) => setSearchQueryA(e.target.value)}
                        />
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
            <div className={`w-full shadow-lg shadow-gray-600 md:hidden duration-500 ${deploy ? "h-80" : "h-48"} overflow-y-scroll custom-scrollbar bg-purple-200`}>
                <div className="px-5 pt-5">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddProducto}>Agregar producto</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
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
                    <div className="flex w-full justify-between">
                        <h1 className="text-center text-2xl font-bold">Categorias</h1>
                        <button className={` w-8 text-2xl rounded-full border-2 text-center border-purple-600 duration-500 ${deploy ? "-rotate-90" : ""} `} title="deploy" onClick={() => setDeploy(!deploy)}><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className={`${deploy ? "" : "hidden"}`}>
                        <button className="p-2 mb-1 mt-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() => { setSearchQuery(""); setDeploy(!deploy) }}>Todas</button>
                        {uniqueCategorias.map((categoria) => (
                            <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === categoria.padre ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} key={categoria.id} onClick={() => { handleButtonClick(categoria.padre); setDeploy(!deploy); }}>{categoria.padre}</button>
                        ))}
                        <h1 className="text-center mt-4 text-2xl font-bold">SubCategoria</h1>
                        <div className="relative">
                            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                            <input
                                type="text"
                                placeholder="Buscar SubCategoria"
                                className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                                onChange={(e) => setSearchQueryA(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showAddProducto && (
                <CrearInventario reload={reload} categorias={categorias} closeComponent={handleAddProducto} />
            )}
        </>
    )
}

export default Inventario;