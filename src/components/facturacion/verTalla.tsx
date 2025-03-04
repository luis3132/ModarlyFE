import { CarritoContext } from "@/lib/hooks/carrito";
import type { Articulo, Talla, VenttallCreate } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { ChangeEvent, FC, FormEvent, Fragment, useContext, useState } from "react";
import Swal from "sweetalert2";

interface verTallasprops {
    articulo: Articulo;
    closeComponent: () => void;
}

const VerTallas: FC<verTallasprops> = ({ articulo, closeComponent }) => {

    const [isOpen, setIsOpen] = useState(true);
    const { handleAddVenttall } = useContext(CarritoContext);

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const updatedVenttallList: VenttallCreate[] = [];

        Array.from(formData.entries()).forEach(([key, value]) => {
            const cantidad = parseInt(value as string, 10);
            const id = parseInt(key);
            if (cantidad > 0) {
                const venttall: VenttallCreate = {
                    venta: 0, // Replace with actual venta value
                    talla: id,
                    cantidad: cantidad,
                    precioFinal: 0, // Replace with actual precioFinal value
                };
                updatedVenttallList.push(venttall);
            }
        });

        if (updatedVenttallList.length > 0) {
            handleAddVenttall(updatedVenttallList);
            Swal.fire({
                icon: 'success',
                title: 'Añadido al carrito',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                closeComponent();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor selecciona una talla y cantidad',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    return (
        <>
            <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black/25" />
                        </TransitionChild>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[40%] max-md:w-[80%] bg-white rounded-lg pb-1 `}>
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10 font-bold" >{articulo.nombre}</div>
                                        <div className="w-full p-5 md:flex relative ">
                                            <div className="md:w-1/2 max-md:w-full h-inherit flex items-center justify-center">
                                                <div className="rounded-xl overflow-hidden mb-2 shadow-2xl h-min" >
                                                    <Image src="/modarly.jpeg" alt="user" className="object-cover" width={200} height={200} />
                                                </div>
                                            </div>
                                            <div className="px-5 max-md:mt-5 md:ml-5 md:w-1/2 max-md:w-full">
                                                <p className="text-xl font-bold">Tallas</p>
                                                <form id="setTalla" onSubmit={handleSubmit}>
                                                    {articulo.tallas.map((talla, index) => (
                                                        <Talla key={talla.id} talla={talla} index={index} />
                                                    ))}
                                                </form>
                                            </div>
                                        </div>
                                        <div className="flex-row justify-end w-full flex items-center py-2 ">
                                            <button type="submit" form="setTalla" className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" >
                                                <Icon icon="mdi:cart" />
                                                Añadir al carrito
                                            </button>
                                        </div>
                                    </div>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default VerTallas;

interface tallaprops {
    talla: Talla;
    index: number;
}

const Talla: FC<tallaprops> = ({ talla, index }) => {

    const {venta} = useContext(CarritoContext);

    const [deploy, setDeploy] = useState(false);
    const [cantidad, setCantidad] = useState<number>(venta.venttall.find((venttall) => venttall.talla === talla.id)?.cantidad || 0);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCantidad(parseInt(e.target.value, 10));
    }

    return (
        <>
            <div key={index} className="p-1">
                <div className="flex justify-between">
                    <button type="button" className={`${deploy && "bg-gray-400 hover:bg-gray-500"} hover:bg-gray-300 bg-gray-200 h-10 w-10 rounded-lg`} onClick={() => setDeploy(!deploy)}>
                        <p className="text-lg">{talla.talla}</p>
                    </button>
                    <p className="text-lg text-slate-400">{talla.cantidad}</p>
                </div>
                <div className={`flex justify-center ${!deploy && "hidden"}`}>
                    <p className="text-lg mr-1">Cantidad:</p>
                    <select name={`${talla.id}`} className="w-1/2 p-1 border border-gray-500 rounded-lg" value={cantidad} onChange={(e) => handleChange(e)}>
                        <option key={0} value={0}>Seleccionar</option>
                        {[...Array(talla.cantidad).keys()].map((i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}