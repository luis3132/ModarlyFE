import { Icon } from "@iconify/react/dist/iconify.js"

export default function Categorias() {
    return (
        <>
            <div className="w-64 shadow-lg shadow-gray-600 max-sm:hidden max-h-screen overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="pr-5 pl-10 pt-11">
                    <button className="bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-2 w-full">Agregar Categoria</button>
                </div>
                <div className="flex flex-col p-5 justify-between">
                    <h1 className="text-center text-2xl font-bold">Categorias</h1>
                    <p>hola</p>
                    <p>hola</p>
                    <p>hola</p>
                </div>
            </div>
        </>
    )
}