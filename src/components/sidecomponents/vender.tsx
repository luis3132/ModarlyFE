import { Icon } from "@iconify/react/dist/iconify.js"

export default function Vender() {
    return (
        <>
            <div className="w-64 shadow-lg shadow-gray-600 max-sm:hidden max-h-screen overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <div className="relative">
                        <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full bg-purple-700 hover:bg-purple-900 text-white p-2 pl-10 rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex flex-col p-5 justify-center">
                    <div>
                        <h1 className="text-center text-2xl font-bold">Categorias</h1>
                        <p>hola</p>
                        <p>hola</p>
                        <p>hola</p>
                    </div>
                    <div className="flex justify-between pt-5">
                        <h1 className="text-2xl font-bold">Mayorista: </h1>
                        <input title="mayorista" type="checkbox" />
                    </div>
                </div>
            </div>
        </>
    )
}