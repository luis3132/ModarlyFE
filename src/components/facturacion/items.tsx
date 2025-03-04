import { Articulo, VenttallCreate } from "@/lib/types/types";
import Image from "next/image";
import { FC } from "react";

interface ItemProps {
    venttall: VenttallCreate;
    articulo: Articulo[];
}

const Items: FC<ItemProps> = ({ articulo, venttall }) => {
    const articuloAct = articulo.find((art) => art.tallas.find((talla) => talla.id === venttall.talla));
    const talla = articuloAct?.tallas.find((talla) => talla.id === venttall.talla);

    return (
        <>
            <div className="relative flex flex-row p-2 rounded-xl shadow-lg mb-2 bg-purple-300" key={articuloAct?.id}>
                <div className="w-1/3 h-inherit flex items-center p-1">
                    <div className="rounded-xl overflow-hidden mb-2 shadow-2xl h-min" >
                        <Image src="/modarly.jpeg" alt="user" className="object-cover" width={200} height={200} />
                    </div>
                </div>
                <div className="w-2/3 flex flex-col">
                    <div className="text-lg">{articuloAct?.nombre}</div>
                    <div className="md:text-sm md:flex">
                        <p className="flex items-center">Precio:</p>
                        <div className="flex w-full justify-center">
                            <input name={`${venttall.talla}`} disabled type="number" value={venttall.precioFinal} className="md:w-full w-[80%] ml-2 p-1 rounded-lg bg-purple-400 shadow-lg" />
                        </div>
                    </div>
                    <div className="md:text-sm">Talla: {talla?.talla}</div>
                    <div className="md:text-sm">Cantidad: {venttall.cantidad}</div>
                </div>
            </div>
        </>
    )
}

export default Items;