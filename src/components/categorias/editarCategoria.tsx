import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { ChangeEvent, FC, Fragment, useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { Categoria } from "@/lib/types/types";
import { ReloadContext } from "@/lib/hooks/reload";
import { CategoriasContext } from "@/lib/hooks/categorias";
import { Put } from "@/lib/scripts/fetch";

interface editCategoriaProps {
    categoria: Categoria;
    closeComponent: () => void;
}

const EditarCategoria: FC<editCategoriaProps> = ({ categoria, closeComponent }) => {
    const [categoriaEdit, setCategoriaEdit] = useState(categoria);
    const { update } = useContext(ReloadContext);
    const { categorias } = useContext(CategoriasContext);

    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const uniqueCategorias = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre)
    );

    const handleSave = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                editCategoria();
            }
        })
    }

    const editCategoria = async () => {
        try {
            const { data, status } = await Put("/api/categoria/update", categoriaEdit);
            if (status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                });
                return;
            }
            Swal.fire(
                'Guardado',
                'La categoria ha sido actualizada',
                'success'
            ).then(() => {
                update();
                closeComponent();
            });
        } catch (e) {
            console.error(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCategoriaEdit({
            ...categoriaEdit, [e.target.name]: e.target.value
        });
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
                                    <div className=" absolute max-h-dvh overflow-y-scroll custom-scrollbar top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[80%] bg-white rounded-lg pb-1  ">
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Editar Categoria</div>
                                        <div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">ID:</div>
                                                <input name="cedula" disabled value={categoria.id} id="id" type="number" className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" placeholder="1005004000" ></input>
                                            </div>
                                            {categoria.hija ? (
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Categoria:</div>
                                                    <select
                                                        title="categorias"
                                                        name="padre"
                                                        value={categoriaEdit.padre}
                                                        onChange={(e) => handleChange(e)}
                                                        id="padre"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2">
                                                        <option value="">Seleccione una Categoria</option>
                                                        {uniqueCategorias.map((categoria) => (
                                                            <option key={categoria.padre} value={categoria.padre}>{categoria.padre}</option>
                                                        ))}
                                                    </select>
                                                    <div className="text-left w-full pl-5">SubCategoria:</div>
                                                    <input
                                                        name="hija"
                                                        value={categoriaEdit.hija}
                                                        onChange={(e) => handleChange(e)}
                                                        maxLength={20}
                                                        id="hija"
                                                        type="text"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                        placeholder="SubCategoria" ></input>

                                                </div>
                                            ) : (
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Categoria:</div>
                                                    <input
                                                        name="padre"
                                                        value={categoriaEdit.padre}
                                                        onChange={(e) => handleChange(e)}
                                                        maxLength={20}
                                                        id="padre1"
                                                        type="text"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                        placeholder="Categoria" ></input>
                                                </div>
                                            )}
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
    )
}

export default EditarCategoria;