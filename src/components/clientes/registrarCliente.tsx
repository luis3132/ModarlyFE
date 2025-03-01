import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { FC, useState, Fragment, ChangeEvent, useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js"
import Swal from "sweetalert2";
import { Post } from "@/lib/scripts/fetch";
import { Cliente } from "@/lib/types/types";
import { ReloadContext } from "@/lib/hooks/reload";

interface CrearClienteProps {
    closeComponent: () => void;
}

const RegistrarCliente: FC<CrearClienteProps> = ({ closeComponent }) => {
    const { update } = useContext(ReloadContext);
    // State to handle the inputs
    const [cliente, setCliente] = useState<Cliente>({
        cedula: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        fijo: "",
        descripcion: "",
        mayorista: false,
        fechaCreacion: new Date()
    });
    // Function to close the modal
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };
    // Function to handle the changes in the inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCliente({
            ...cliente, [e.target.name]: e.target.value
        });
        if (e.target.name === "mayorista") {
            setCliente({
                ...cliente, [e.target.name]: (e.target as HTMLInputElement).checked
            });
        }
    }
    // Function to handle the save button
    const handleSave = () => {
        if (cliente.cedula === "" || cliente.nombres === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene cedula y nombres!',
            });
        } else {
            Swal.fire({
                title: 'Guardar Cliente',
                text: "¿Estas seguro de guardar este cliente?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    saveClient();
                    Swal.fire(
                        'Guardado!',
                        'El cliente ha sido guardado.',
                        'success'
                    ).then(() => {
                        update();
                        closeModal();
                    });
                }
            });
        }
    }
    // Function to save the client
    const saveClient = async () => {
        try {
            await Post("/api/cliente/new", cliente);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!' + e,
            });
        }
    }

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
                                    <div className=" absolute max-h-dvh top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[30%] w-[80%] bg-white rounded-lg pb-1  ">
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Anadir Cliente</div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Cedula:</div>
                                            <input
                                                name="cedula"
                                                value={cliente.cedula}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={20}
                                                id="cedula"
                                                type="number"
                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                placeholder="1005004000" ></input>
                                        </div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Nombres:</div>
                                            <input
                                                name="nombres"
                                                value={cliente.nombres}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={100}
                                                id="nombres"
                                                type="text"
                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                placeholder="Daniel Esteban" ></input>
                                        </div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Apellidos:</div>
                                            <input
                                                name="apellidos"
                                                value={cliente.apellidos}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={150}
                                                id="apellidos"
                                                type="text"
                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                placeholder="Gomez Salazar" ></input>
                                        </div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Telefono:</div>
                                            <input
                                                name="telefono"
                                                value={cliente.telefono}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={10}
                                                id="telefono"
                                                type="number"
                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                placeholder="3103538952" ></input>
                                        </div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Fijo:</div>
                                            <input
                                                name="fijo"
                                                value={cliente.fijo}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={10}
                                                id="fijo"
                                                type="number"
                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                placeholder="6076363636" ></input>
                                        </div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Descripcion:</div>
                                            <textarea
                                                name="descripcion"
                                                value={cliente.descripcion}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={500}
                                                id="descripcion"
                                                className="bg-gray-200 h-8 rounded-3xl text-center w-[80%] pl-2"
                                                placeholder="descripcion" ></textarea>
                                        </div>
                                        <div className="" >
                                            <div className="text-left w-full pl-5">Mayorista:</div>
                                            <input
                                                title="mayorista"
                                                checked={cliente.mayorista}
                                                name="mayorista"
                                                onChange={(e) => handleChange(e)}
                                                id="mayorista"
                                                type="checkbox"
                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                        </div>
                                        <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleSave}>
                                                <Icon icon="ri:save-line" />
                                                Guardar
                                            </button>
                                            <div className="w-[20%] "></div>
                                            <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={closeComponent}>
                                                <Icon icon="line-md:cancel-twotone" />
                                                Cancelar
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
    );
}

export default RegistrarCliente;