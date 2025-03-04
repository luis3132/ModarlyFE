import { CarritoContext } from "@/lib/hooks/carrito";
import { VenttallCreate } from "@/lib/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";

interface CarritoProps {
    venttall: VenttallCreate;
}

const Carrito: FC<CarritoProps> = ({ venttall }) => {

    const { mayorista, handleDeleteVenttall, articulos } = useContext(CarritoContext);

    const articuloAct = articulos.find((art) => art.tallas.find((talla) => talla.id === venttall.talla));
    const talla = articuloAct?.tallas.find((talla) => talla.id === venttall.talla);

    const [precio, setPrecio] = useState<number>(0);

    // Set the price of the article
    useEffect(() => {
        const mar = (articuloAct?.precioMayorista ?? 0) * venttall.cantidad;
        const tal = (articuloAct?.precioDetal ?? 0) * venttall.cantidad;
        if (precio === 0) {
            if (mayorista) {
                setPrecio(mar);
            } else {
                setPrecio(tal);
            }
        } else {
            if (mar === precio || tal === precio) {
                if (mayorista) {
                    setPrecio(mar);
                } else {
                    setPrecio(tal);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mayorista]);

    useEffect(() => {
        const mar = (articuloAct?.precioMayorista ?? 0) * venttall.cantidad;
        const tal = (articuloAct?.precioDetal ?? 0) * venttall.cantidad;
        if (mayorista) {
            setPrecio(mar);
        } else {
            setPrecio(tal);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venttall]);

    const handlePrecio = (e: ChangeEvent<HTMLInputElement>) => {
        setPrecio(Number(e.target.value));
    }

    return (
        <>
            <div className="relative flex flex-row p-2 rounded-xl shadow-lg mb-2 bg-purple-300" key={articuloAct?.id}>
                <div className="w-1/3 h-inherit flex items-center p-1">
                    <div className="rounded-xl overflow-hidden mb-2 shadow-2xl h-min" >
                        <Image src="/modarly.jpeg" alt="user" className="object-cover" width={100} height={100} />
                    </div>
                </div>
                <div className="w-2/3 flex flex-col">
                    <div className="text-lg">{articuloAct?.nombre}</div>
                    <div className="md:text-sm md:flex">
                        <p className="flex items-center">Precio:</p>
                        <div className="flex w-full justify-center">
                            <input name={`${venttall.talla}`} type="number" value={precio} className="md:w-full w-[80%] ml-2 p-1 rounded-lg bg-purple-400 shadow-lg" onChange={(e) => handlePrecio(e)} />
                        </div>
                    </div>
                    <div className="md:text-sm">Talla: {talla?.talla}</div>
                    <div className="md:text-sm">Cantidad: {venttall.cantidad}</div>
                    <div className="flex justify-end relative">
                        <button className="float-right justify-center flex items-center bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => handleDeleteVenttall(venttall.talla)}>
                            <Icon icon="material-symbols:delete-outline" />
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carrito;