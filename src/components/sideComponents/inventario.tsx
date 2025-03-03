import { CategoriasContext } from "@/lib/hooks/categorias";
import { ReloadContext } from "@/lib/hooks/reload";
import { Icon } from "@iconify/react/dist/iconify.js"
import React, { FC, useContext, useState } from "react";
import Loading from "../extra/loading";
import ErrorScreen from "../extra/errorScreen";
import RegistrarInventario from "../inventario/registrarInventario";


interface inventarioprops {
    error: string | null;
    setSearchQuery: (query: string) => void;
    setSearchQueryA: (query: string) => void;
}

const Inventario: FC<inventarioprops> = ({ error, setSearchQuery, setSearchQueryA }) => {

    const { categorias } = useContext(CategoriasContext);
    const { loading } = useContext(ReloadContext);

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
        if (categoria != "none") {
            setSearchQuery(categoria); // Update search query
            setActiveButton(categoria); // Update active button state
        } else {
            setSearchQuery(""); // Update search query
            setActiveButton("none"); // Update active button state
        }
    };

    return (
        <>
            <div className="min-w-64 max-w-64 shadow-lg shadow-gray-600 max-md:hidden max-h-dvh overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddProducto}>Agregar producto</button>
                </div>
                <div className="flex flex-col p-5 h-[90%]">
                    <h1 className="text-center text-2xl font-bold">Categorias</h1>
                    <div className="w-full max-h-[80%] overflow-y-scroll custom-scrollbar ">
                        <button
                            className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "none" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`}
                            onClick={() => handleButtonClick("none")}>
                            Todas
                        </button>
                        {uniqueCategorias.map((categoria) => (
                            <button
                                className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === categoria.padre ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`}
                                key={categoria.id}
                                onClick={() => handleButtonClick(categoria.padre)}>
                                {categoria.padre}
                            </button>
                        ))}
                    </div>
                    {loading && <Loading />}
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
                    {error && <ErrorScreen error={error} />}
                </div>
            </div>
            <div className={`w-full shadow-lg shadow-gray-600 md:hidden duration-500 ${deploy ? "h-80" : "h-48"} overflow-y-scroll custom-scrollbar bg-purple-200`}>
                <div className="px-5 pt-5">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddProducto}>Agregar producto</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    {loading && <Loading />}
                    {error && <ErrorScreen error={error} />}
                    <div className="flex w-full justify-between">
                        <h1 className="text-center text-2xl font-bold">Categorias</h1>
                        <button className={` w-8 text-2xl rounded-full border-2 text-center border-purple-600 duration-500 ${deploy ? "-rotate-90" : ""} `} title="deploy" onClick={() => setDeploy(!deploy)}><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className={`${deploy ? "" : "hidden"}`}>
                        <button
                            className="p-2 mb-1 mt-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md"
                            onClick={() => { handleButtonClick("none"); setDeploy(!deploy) }}>
                            Todas
                        </button>
                        {uniqueCategorias.map((categoria) => (
                            <button
                                className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === categoria.padre ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`}
                                key={categoria.id}
                                onClick={() => { handleButtonClick(categoria.padre); setDeploy(!deploy); }}>
                                {categoria.padre}
                            </button>
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
                <RegistrarInventario closeComponent={handleAddProducto} />
            )}
        </>
    )
}

export default Inventario;