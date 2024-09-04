import { Icon } from "@iconify/react/dist/iconify.js"

export default function Inventario() {
    return (
        <>
            <div className="w-64 shadow-lg shadow-gray-600 max-sm:hidden max-h-screen overflow-y-scroll custom-scrollbar">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full">Agregar producto</button>
                </div>
                <div className="p-5">
                    <div className="relative">
                        <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <p>hola</p>
                    <p>hola</p>
                    <p>hola</p>
                </div>
            </div>
        </>
    )
}