import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { FC, useState, Fragment, useContext, ChangeEvent } from "react";
import { Icon } from "@iconify/react/dist/iconify.js"
import Swal from "sweetalert2";
import { CategoriaCreate } from "@/lib/types/types";
import { ReloadContext } from "@/lib/hooks/reload";
import { CategoriasContext } from "@/lib/hooks/categorias";
import { Post } from "@/lib/scripts/fetch";

interface CrearCategoriaProps {
    closeComponent: () => void;
}

const RegistrarCategoria: FC<CrearCategoriaProps> = ({ closeComponent }) => {
    // State to handle the inputs
    const [categoria, setCategoria] = useState<CategoriaCreate>({
        padre: "",
        hija: "",
        estado: true
    });
    const [isCategoria, setIsCategoria] = useState(false);
    const [isSubCategoria, setIsSubCategoria] = useState(false);
    const { update } = useContext(ReloadContext);
    const { categorias } = useContext(CategoriasContext);

    const categoriasPadre = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre));

    // Function to close the modal
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    // Function to handle the save button
    const handleSave = () => {
        if (!isCategoria) {
            if (categoria.padre === "" || categoria.hija === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor llene los campos de Categoria y SubCategoria!',
                });
                return;
            }
            Swal.fire({
                title: 'Guardar SubCategoria',
                text: "¿Estas seguro de guardar esta categoria?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    saveClient();
                }
            });
            return;
        }
        if (categoria.padre === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene el campo de Categoria!',
            });
            return;
        }
        Swal.fire({
            title: 'Guardar Categoria',
            text: "¿Estas seguro de guardar esta categoria?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                saveClient();
            }
        });
    }
    // Function to save the client
    const saveClient = async () => {
        try {
            const { status } = await Post("/api/categoria/new", categoria);
            if (status === 201) {
                Swal.fire(
                    'Guardado!',
                    'La Categoria ha sido guardada.',
                    'success'
                ).then(() => {
                    update();
                    closeComponent();
                });
            }
        } catch (e) {
            console.error(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error al guardar la categoria!',
            });
        }
    }

    const handleChance = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
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
                                    <div className=" absolute top-1/2 max-h-dvh overflow-y-scroll custom-scrollbar left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[80%] bg-white rounded-lg pb-1  ">
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Anadir Categoria</div>
                                        <div className="flex-row justify-center w-full flex items-center pt-2 mb-2 ">
                                            <button
                                                className="justify-center text-gray-900 flex items-center p-1 bg-purple-500 hover:bg-purple-600 rounded-lg"
                                                onClick={() => { setIsCategoria(true); setIsSubCategoria(false); }}>
                                                <Icon icon="tabler:category" />
                                                Categoria
                                            </button>
                                            <div className="w-[10%] "></div>
                                            <button
                                                className="justify-center text-gray-900 flex items-center p-1 bg-purple-500 hover:bg-purple-600 rounded-lg"
                                                onClick={() => { setIsCategoria(false); setIsSubCategoria(true); }}>
                                                <Icon icon="tabler:category" />
                                                SubCategoria
                                            </button>
                                        </div>
                                        {isCategoria && (
                                            <>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Categoria:</div>
                                                    <input
                                                        name="padre"
                                                        value={categoria.padre}
                                                        onChange={(e) => handleChance(e)}
                                                        maxLength={20}
                                                        id="padre"
                                                        type="text"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                        placeholder="Categoria" ></input>
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
                                            </>
                                        )}
                                        {isSubCategoria && (
                                            <>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Categoria:</div>
                                                    <select
                                                        title="categorias"
                                                        name="padre"
                                                        value={categoria.padre}
                                                        onChange={(e) => handleChance(e)}
                                                        id="padre"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2">
                                                        <option value="">Seleccione una Categoria</option>
                                                        {categoriasPadre.map((categoria) => (
                                                            <option key={categoria.padre} value={categoria.padre}>{categoria.padre}</option>
                                                        ))}
                                                    </select>
                                                    <div className="text-left w-full pl-5">SubCategoria:</div>
                                                    <input
                                                        name="hija"
                                                        value={categoria.hija}
                                                        onChange={(e) => setCategoria({ ...categoria, hija: e.target.value })}
                                                        maxLength={20}
                                                        id="hija"
                                                        type="text"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                        placeholder="SubCategoria" ></input>
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
                                            </>
                                        )}
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

export default RegistrarCategoria;