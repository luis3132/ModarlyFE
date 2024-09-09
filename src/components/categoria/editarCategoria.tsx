import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, FC, Fragment, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";

interface editCategoriaProps {
    categoria: {
        id: number;
        padre: string;
        hija: string;
    };
    setReload: () => void;
    closeComponent: () => void;
    categorias: categoria[];
}

interface categoria {
    id: number;
    padre: string;
    hija: string;
};

const EditarCategoria: FC<editCategoriaProps> = ({ categoria, setReload, closeComponent, categorias }) => {
    const [categoriaEdit, setCategoriaEdit] = useState(categoria);

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
                Swal.fire(
                    'Guardado',
                    'La categoria ha sido actualizada',
                    'success'
                ).then(() => {
                    setReload();
                    closeComponent();
                });
            }
        })
    }

    const editCategoria = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/categoria/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoriaEdit)
            });
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e);
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
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[80%] bg-white rounded-lg pb-1  ">
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Editar Categoria</div>
                                        <div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">ID:</div>
                                                <input name="cedula" disabled value={categoria.id} id="id" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="1005004000" ></input>
                                            </div>
                                            {categoria.hija ? (
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Categoria:</div>
                                                    <select title="categorias" name="padre" value={categoriaEdit.padre} onChange={(e)=> handleChange(e)} id="padre" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2">
                                                        <option value="">Seleccione una Categoria</option>
                                                        {uniqueCategorias.map((categoria) => (
                                                            <option key={categoria.padre} value={categoria.padre}>{categoria.padre}</option>
                                                        ))}
                                                    </select>
                                                    <div className="text-left w-full pl-5">SubCategoria:</div>
                                                    <input name="hija" value={categoriaEdit.hija} onChange={(e)=> handleChange(e)} maxLength={20} id="hija" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="SubCategoria" ></input>
                                                </div>
                                            ) : (
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Categoria:</div>
                                                    <input name="padre" value={categoriaEdit.padre} onChange={(e)=> handleChange(e)}maxLength={20} id="padre1" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="1005004000" ></input>
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
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default EditarCategoria;