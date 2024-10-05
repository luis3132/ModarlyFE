import { Icon } from "@iconify/react/dist/iconify.js"
import React, { useState, FC } from "react";
import CrearCliente from "../cliente/crearCliente";

interface ClientesProps {
    setSearchQuery: (query: string) => void;
    setReload: () => void;
}

const Clientes: FC<ClientesProps> = ({ setSearchQuery, setReload }) => {

    const [showAddCliente, setShowAddCliente] = useState(false);
    const [activeButton, setActiveButton] = useState("");
    const [deploy, setDeploy] = useState(false);

    const handleAddCliente = () => {
        setShowAddCliente(!showAddCliente);
    }

    const handleButtonClick = (cliente: string) => {
        if (cliente != "e") {
            setSearchQuery(cliente); // Update search query
            setActiveButton(cliente); // Update active button state
        } else {
            setSearchQuery(""); // Update search query
            setActiveButton("e"); // Update active button state
        }
    }

    return (
        <>
            <div className="min-w-64 shadow-lg shadow-gray-600 max-md:hidden max-h-dvh overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCliente} >Agregar Cliente</button>
                </div>
                <div className="p-5">
                    <div className="relative">
                        <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar Cliente"
                            className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col p-5 justify-between">
                        <h1 className="text-center text-2xl font-bold">Clientes</h1>
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "e" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("e")}>Todos</button>
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "true" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("true")}>Mayoristas</button>
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "false" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("false")}>Minoristas</button>
                    </div>
                </div>
            </div>
            <div className={`w-full shadow-lg duration-500 ${deploy ? "h-80" : "h-48"} shadow-gray-600 md:hidden overflow-y-scroll custom-scrollbar bg-purple-200`}>
                <div className="px-5 pt-5">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCliente} >Agregar Cliente</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <div className="flex w-full justify-between ">
                        <h1 className="text-center text-2xl font-bold">Clientes</h1>
                        <button className={` w-8 text-2xl rounded-full border-2 text-center border-purple-600 duration-500 ${deploy ? "-rotate-90" : ""} `} title="deploy" onClick={() => setDeploy(!deploy)}><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className={`${deploy ? "" : "hidden"} mt-2`}>
                        <div className="relative">
                            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                            <input
                                type="text"
                                placeholder="Buscar Cliente"
                                className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className={` mt-2 p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "e" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("e")}>Todos</button>
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "true" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("true")}>Mayoristas</button>
                        <button className={`p-2 mb-1 w-full bg-purple-300 hover:bg-purple-400 rounded-md ${activeButton === "false" ? "bg-purple-500" : "bg-purple-300 hover:bg-purple-400"}`} onClick={() => handleButtonClick("false")}>Minoristas</button>
                    </div>
                </div>
            </div>
            {showAddCliente && (
                <CrearCliente closeComponent={handleAddCliente} setReload={setReload} />
            )}
        </>
    )
}

export default Clientes;