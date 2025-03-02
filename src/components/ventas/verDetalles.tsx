import { Dialog, Transition, TransitionChild } from "@headlessui/react"
import { FC, Fragment, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js";
import { Venta } from "@/lib/types/types";
import Image from "next/image";

interface VerDetallesProps {
    closeComponent: () => void;
    venta: Venta;
}

const VerDetalles: FC<VerDetallesProps> = ({ closeComponent, venta }) => {
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const total = venta.venttall.reduce((total, i) => {
        return total + (i?.precioFinal || 0);
    }, 0);

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
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[60%] max-md:w-[80%] bg-white rounded-lg pb-2 `}>
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10 font-bold" >Detalles de la Venta</div>
                                        <div className="relative w-full h-min md:flex max-md:pl-3">
                                            <div className="md:w-1/2 max-md:w-full max-h-[80%] pl-4">
                                                <div className="text-2xl font-bold" >Items</div>
                                                <div className='h-min max-h-60 md:max-h-72 overflow-y-scroll custom-scrollbar'>
                                                    {venta.venttall.map((vt, index) => {
                                                        return (
                                                            <div className="relative flex flex-row p-2 rounded-xl shadow-lg mb-2 bg-purple-300" key={index}>
                                                                <div className="w-1/3 h-inherit flex items-center p-1">
                                                                    <div className="rounded-xl overflow-hidden mb-2 shadow-2xl h-min" >
                                                                        <Image src="/modarly.jpeg" alt="user" className="object-cover" width={200} height={200} />
                                                                    </div>
                                                                </div>
                                                                <div className="w-2/3 flex flex-col">
                                                                    <div className="text-lg">{vt.talla.articulo.nombre}</div>
                                                                    <div className="md:text-sm md:flex">
                                                                        <p className="flex items-center">Precio:</p>
                                                                        <div className="flex w-full justify-center">
                                                                            <input name={`${vt.talla.id}`} disabled type="number" value={vt.precioFinal} className="md:w-full w-[80%] ml-2 p-1 rounded-lg bg-purple-400 shadow-lg" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="md:text-sm">Talla: {vt.talla.talla}</div>
                                                                    <div className="md:text-sm">Cantidad: {vt.cantidad}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="w-full justify-between flex py-5">
                                                    <p>Total:</p>
                                                    <p>{total}</p>
                                                </div>
                                            </div>
                                            <div className="md:w-1/2 max-md:w-full px-5 bg-slate-100 rounded-lg md:ml-2 mb-2">
                                                <div className="text-2xl font-bold" >Cliente</div>
                                                <div className="flex flex-col">
                                                    <div className="md:flex ">
                                                        <div className="w-full md:w-1/2">
                                                            <p className="text-lg">Cedula: {venta.cliente.cedula}</p>
                                                            <p className="text-lg">Nombres: {venta.cliente.nombres}</p>
                                                            <p className="text-lg">Apellidos: {venta.cliente.apellidos}</p>
                                                            <p className="text-lg">Telefono: {venta.cliente.telefono}</p>
                                                        </div>
                                                        <div className="w-full md:w-1/2">
                                                            <p className="text-lg">Fijo: {venta.cliente.fijo}</p>
                                                            <p className="text-lg bg-slate-200 rounded-lg">Descripcion: {venta.cliente.descripcion}</p>
                                                            <p className="text-lg">Mayorista: {venta.cliente.mayorista ? "Si" : "No"}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-lg mt-4">Fecha de Creacion: {new Date(venta.cliente.fechaCreacion).toLocaleString()}</p>
                                                </div>
                                            </div>
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

export default VerDetalles;