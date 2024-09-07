import { FC, useState, Fragment, ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ClientesProps {
    closeComponent: () => void;
    cliente: { cedula: string, nombres: string, apellidos: string, mayorista: boolean, telefono: string, fijo: string, descripcion: string };
}

interface Cliente {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    fijo: string;
    descripcion: string;
    mayorista: boolean;
}

const VerCliente: FC<ClientesProps> = ({ cliente, closeComponent }) => {

    const [cliente1, setCliente1] = useState<Cliente>(cliente);
    const [edit, setEdit] = useState(false);

    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCliente1({
            ...cliente, [e.target.name]: e.target.value
        });
        if (e.target.name === "mayorista") {
            setCliente1({
                ...cliente, [e.target.name]: (e.target as HTMLInputElement).checked
            });
        }
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
                                        {edit ? (<>
                                            <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                            <div className="text-2xl pt-3 pl-10" >{cliente.nombres} {cliente.apellidos}</div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Cedula:</div>
                                                <input name="cedula" value={cliente.cedula} onChange={(e) => handleChange(e)} maxLength={20} id="cedula" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="1005004000" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Nombres:</div>
                                                <input name="nombres" value={cliente.nombres} onChange={(e) => handleChange(e)} maxLength={100} id="nombres" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Daniel Esteban" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Apellidos:</div>
                                                <input name="apellidos" value={cliente.apellidos} onChange={(e) => handleChange(e)} maxLength={150} id="apellidos" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Gomez Salazar" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Telefono:</div>
                                                <input name="telefono" value={cliente.telefono} onChange={(e) => handleChange(e)} maxLength={10} id="telefono" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="3103538952" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Fijo:</div>
                                                <input name="fijo" value={cliente.fijo} onChange={(e) => handleChange(e)} maxLength={10} id="fijo" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="6076363636" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Descripcion:</div>
                                                <textarea name="descripcion" value={cliente.descripcion} onChange={(e) => handleChange(e)} maxLength={500} id="descripcion" className="bg-black bg-opacity-10 h-8 rounded-3xl text-center w-[80%] pl-2" placeholder="descripcion" ></textarea>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Mayorista:</div>
                                                <input title="mayorista" checked={cliente.mayorista} name="mayorista" onChange={(e) => handleChange(e)} id="mayorista" type="checkbox" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                            </div>
                                            <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg">
                                                    <Icon icon="material-symbols:delete-outline" />
                                                    Eliminar
                                                </button>
                                                <div className="w-[10%] "></div>
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg">
                                                    <Icon icon="ri:save-line" />
                                                    Guardar
                                                </button>
                                                <div className="w-[10%] "></div>
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => setEdit(!edit)}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            </div>
                                        </>) : (<>
                                            <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                            <div className="text-2xl pt-3 pl-10" >{cliente.nombres} {cliente.apellidos}</div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Cedula:</div>
                                                <input title='z' disabled value={cliente.cedula} id="cedula1" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Nombres:</div>
                                                <input disabled value={cliente.nombres} id="nombres1" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Daniel Esteban" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Apellidos:</div>
                                                <input disabled value={cliente.apellidos} id="apellidos1" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Gomez Salazar" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Telefono:</div>
                                                <input disabled value={cliente.telefono} id="telefono1" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="3103538952" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Fijo:</div>
                                                <input disabled value={cliente.fijo} id="fijo1" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="6076363636" ></input>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Descripcion:</div>
                                                <textarea disabled value={cliente.descripcion} id="descripcion1" className="bg-black bg-opacity-10 h-8 rounded-3xl text-center w-[80%] pl-2" placeholder="descripcion" ></textarea>
                                            </div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Mayorista:</div>
                                                <input title="z" disabled checked={cliente.mayorista} id="mayorista1" type="checkbox" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                            </div>
                                            <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={() => setEdit(!edit)}>
                                                    <Icon icon="ri:save-line" />
                                                    Editar
                                                </button>
                                                <div className="w-[20%] "></div>
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={closeComponent}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            </div>
                                        </>)}
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}

export default VerCliente;