import { Icon } from "@iconify/react/dist/iconify.js"
import { useState, FC } from "react";
import CrearCliente from "../cliente/crearCliente";

interface ClientesProps {
    setSearchQuery: (query: string) => void;
    setReload: () => void;
}

const Clientes: FC<ClientesProps> = ({setSearchQuery, setReload}) => {

    const [showAddCliente, setShowAddCliente] = useState(false);

    const handleAddCliente = () => {
        setShowAddCliente(!showAddCliente);
    }

    return (
        <>
            <div className="min-w-64 shadow-lg shadow-gray-600 max-md:hidden max-h-screen overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCliente} >Agregar Cliente</button>
                </div>
                {showAddCliente && (
                    <CrearCliente closeComponent={handleAddCliente} setReload={setReload} />
                    )}
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
                </div>
            </div>
            <div className="w-full shadow-lg shadow-gray-600 md:hidden overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-5 pt-5">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full" onClick={handleAddCliente} >Agregar Cliente</button>
                </div>
                {showAddCliente && (
                    <CrearCliente closeComponent={handleAddCliente} setReload={setReload} />
                    )}
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
                </div>
            </div>
        </>
    )
}

export default Clientes;