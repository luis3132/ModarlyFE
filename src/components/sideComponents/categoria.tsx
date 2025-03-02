import React, { FC, useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ErrorScreen from "../extra/errorScreen";
import { ReloadContext } from "@/lib/hooks/reload";
import Loading from "../extra/loading";
import { CategoriasContext } from "@/lib/hooks/categorias";
import RegistrarCategoria from "../categorias/registrarCategoria";

interface CategoriasProps {
    setSearchQuery: (query: string) => void;
    error?: string | null;
}

const SideCategorias: FC<CategoriasProps> = ({ setSearchQuery, error }) => {

    const [showAddCategoria, setShowAddCategoria] = useState(false);
    const [deploy, setDeploy] = useState(false);
    const [activeButton, setActiveButton] = useState("");
    const { loading } = useContext(ReloadContext);
    const { categorias } = useContext(CategoriasContext);

    const padres = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre));

    const handleAddCategoria = () => {
        setShowAddCategoria(!showAddCategoria);
    }

    const handleButtonClick = (categoria: string) => {
        if (categoria != "none") {
            setSearchQuery(categoria); // Update search query
            setActiveButton(categoria); // Update active button state
        } else {
            setSearchQuery(""); // Update search query
            setActiveButton("none"); // Update active button state
        }
    }

    return (
        <>
            <div className="min-w-64 max-w-64 shadow-lg shadow-gray-600 max-md:hidden max-h-dvh overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCategoria}>Agregar Categoria</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <h1 className="text-center text-2xl font-bold">Categorias</h1>
                    <button
                        className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "none" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`}
                        onClick={() => handleButtonClick("none")}>
                        Todas
                    </button>
                    {padres.map((categoria) => (
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === categoria.padre ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} key={categoria.id} onClick={() => handleButtonClick(`${categoria.padre}`)}>{categoria.padre}</button>
                    ))}
                    {loading && <Loading />}
                    {error && <ErrorScreen error={error} />}
                </div>
            </div>
            <div className={`w-full shadow-lg shadow-gray-600 md:hidden ${loading ? "h-48" : "h-36"} ${deploy ? "duration-500 h-80" : "duration-500"} overflow-y-scroll custom-scrollbar bg-purple-200`}>
                <div className="px-5 pt-5">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCategoria}>Agregar Categoria</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <div className="flex w-full justify-between">
                        <h1 className="text-center text-2xl font-bold">Categorias</h1>
                        <button className={` w-8 text-2xl rounded-full border-2 text-center border-purple-600 duration-500 ${deploy ? "-rotate-90" : ""} `} title="deploy" onClick={() => setDeploy(!deploy)}><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className={`${deploy ? "" : "hidden"}`}>
                        <button className="p-2 mb-1 mt-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() => { handleButtonClick("none"); setDeploy(!deploy) }}>Todas</button>
                        {padres.map((categoria) => (
                            <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === categoria.padre ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} key={categoria.id} onClick={() => { handleButtonClick(`${categoria.padre}`); setDeploy(!deploy); }}>{categoria.padre}</button>
                        ))}
                    </div>
                    {loading && <Loading />}
                    {error && <ErrorScreen error={error} />}
                </div>
            </div>
            {showAddCategoria && (
                <RegistrarCategoria closeComponent={handleAddCategoria} />
            )}
        </>
    )
}

export default SideCategorias;