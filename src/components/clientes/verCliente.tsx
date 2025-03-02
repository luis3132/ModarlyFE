import React, { FC, useState, Fragment, ChangeEvent, useEffect, useContext } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Swal from 'sweetalert2';
import { Cliente, Venta } from '@/lib/types/types';
import { ReloadContext } from '@/lib/hooks/reload';
import { Delete, Get, Put } from '@/lib/scripts/fetch';
import Loading from '../extra/loading';
import VentaCliente from './ventaCliente';

interface ClientesProps {
    closeComponent: () => void;
    cliente: Cliente;
}

const VerCliente: FC<ClientesProps> = ({ cliente, closeComponent }) => {

    const [cliente1, setCliente1] = useState<Cliente>(cliente);
    const [edit, setEdit] = useState(false);
    const [ventasHechas, setVentasHechas] = useState(0);
    const [ventas, setVentas] = useState<Venta[]>([]);

    const [inicio, setInicio] = useState<string | null>(null);
    const [fin, setFin] = useState<string | null>(null);
    const { update, loading, loadingUpdate } = useContext(ReloadContext);

    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    useEffect(() => {
        const fetchventa = async () => {
            try {
                const { data } = await Get(`/api/venta/count/${cliente.cedula}`);
                setVentasHechas(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchventa();
    }, [cliente.cedula]);

    // Function to handle the changes in the inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCliente1({
            ...cliente1, [e.target.name]: e.target.value
        });
        if (e.target.name === "mayorista") {
            setCliente1({
                ...cliente1, [e.target.name]: (e.target as HTMLInputElement).checked
            });
        }
    }

    // Function to handle the Cancel button
    const handleCancel = () => {
        setEdit(!edit);
        setCliente1(cliente);
    }

    // Function to handle the Save button
    const handleSave = () => {
        if (cliente1 !== cliente) {
            Swal.fire({
                title: 'Guardar Cliente',
                text: "¿Estas seguro de guardar este cliente?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { status } = await Put(`/api/cliente/update`, cliente1);
                        if (status !== 200) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Error al guardar el cliente"
                            });
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Guardado",
                            text: "Cliente guarda con exito"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                update();
                                closeComponent();
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Error al guardar el cliente"
                        });
                    }
                }
            });
        }
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Eliminar Cliente',
            text: "¿Estas seguro de eliminar este cliente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Delete(`/api/cliente/delete/${cliente.cedula}`);
                update();
                closeModal();
            }
        });
    }

    const handleInicio = (e: ChangeEvent<HTMLInputElement>) => {
        setInicio(e.target.value);
    }

    const handleFin = (e: ChangeEvent<HTMLInputElement>) => {
        setFin(e.target.value);
    }

    const fetchVentas = async () => {
        loadingUpdate(true);
        if (!inicio && !fin) {
            loadingUpdate(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un rango de fechas"
            });
            return;
        }
        if (inicio && fin && inicio >= fin) {
            loadingUpdate(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "La fecha de inicio debe ser menor o igual a la fecha de fin"
            });
            return;
        }
        try {
            const { data } = await Get(`/api/venta/list/rango/${inicio}/${fin}/${cliente.cedula}`);
            setVentas(data);
            loadingUpdate(false);
            console.log(data);
        } catch (e) {
            console.log(e);
            loadingUpdate(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al cargar las ventas"
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
                                    <div className={` absolute max-h-dvh top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 ${edit ? "xl:w-[30%]" : "xl:w-[60%]"} w-[90%] bg-white rounded-lg pb-1 `}>
                                        {edit ? (
                                            <>
                                                <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                                <div className="text-2xl pt-3 pl-10" >{cliente1.nombres} {cliente1.apellidos}</div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Cedula:</div>
                                                    <input
                                                        name="cedula"
                                                        value={cliente1.cedula}
                                                        disabled
                                                        id="cedula"
                                                        type="number"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                        placeholder="1005004000"  ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Nombres:</div>
                                                    <input
                                                        name="nombres"
                                                        value={cliente1.nombres}
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
                                                        value={cliente1.apellidos}
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
                                                        value={cliente1.telefono}
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
                                                        value={cliente1.fijo}
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
                                                        value={cliente1.descripcion}
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
                                                        checked={cliente1.mayorista}
                                                        name="mayorista"
                                                        onChange={(e) => handleChange(e)}
                                                        id="mayorista"
                                                        type="checkbox"
                                                        className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={handleDelete}>
                                                        <Icon icon="material-symbols:delete-outline" />
                                                        Eliminar
                                                    </button>
                                                    <div className="w-[10%] "></div>
                                                    <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleSave}>
                                                        <Icon icon="ri:save-line" />
                                                        Guardar
                                                    </button>
                                                    <div className="w-[10%] "></div>
                                                    <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={handleCancel}>
                                                        <Icon icon="line-md:cancel-twotone" />
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                                <div className="text-2xl pt-3 pl-10" >{cliente.nombres} {cliente.apellidos}</div>
                                                <div className="w-full md:flex">
                                                    <div className="md:w-1/3 w-full" >
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Cedula:</div>
                                                            <input
                                                                title='z'
                                                                disabled
                                                                value={cliente.cedula}
                                                                id="cedula1"
                                                                type="number"
                                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                        </div>
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Nombres:</div>
                                                            <input
                                                                disabled
                                                                value={cliente.nombres}
                                                                id="nombres1"
                                                                type="text"
                                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                                placeholder="N.N." ></input>
                                                        </div>
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Apellidos:</div>
                                                            <input
                                                                disabled
                                                                value={cliente.apellidos}
                                                                id="apellidos1"
                                                                type="text"
                                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                                placeholder="N.N." ></input>
                                                        </div>
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Telefono:</div>
                                                            <input
                                                                disabled
                                                                value={cliente.telefono}
                                                                id="telefono1"
                                                                type="number"
                                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                                placeholder="N.N." ></input>
                                                        </div>
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Fijo:</div>
                                                            <input
                                                                disabled
                                                                value={cliente.fijo}
                                                                id="fijo1"
                                                                type="number"
                                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2"
                                                                placeholder="N.N." ></input>
                                                        </div>
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                            <textarea
                                                                disabled
                                                                value={cliente.descripcion}
                                                                id="descripcion1"
                                                                className="bg-gray-200 h-8 rounded-3xl text-center w-[80%] pl-2"
                                                                placeholder="."></textarea>
                                                        </div>
                                                        <div className="" >
                                                            <div className="text-left w-full pl-5 font-bold">Mayorista:</div>
                                                            <input
                                                                title="z"
                                                                disabled
                                                                checked={cliente.mayorista}
                                                                id="mayorista1"
                                                                type="checkbox"
                                                                className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                        </div>

                                                    </div>
                                                    <div className="w-full md:w-2/3 pr-4 max-md:pl-4">
                                                        <div className="text-left w-full pl-5 font-bold">Ventas:</div>
                                                        <div className="w-full rounded-lg bg-gray-200">
                                                            <div className="flex justify-between w-full pt-2">
                                                                <div className="text-left text-gray-400 pl-5">Realizadas en total:</div>
                                                                <div className="text-gray-400 pr-5">{ventasHechas}</div>
                                                            </div>
                                                            <div className="flex w-full">
                                                                <div className="w-3/4">
                                                                    <div className="text-left w-full pl-5 font-bold">Fecha Inicio:</div>
                                                                    <input
                                                                        value={inicio ?? ''}
                                                                        type="date"
                                                                        onChange={(e) => handleInicio(e)}
                                                                        className="bg-gray-300 h-8 rounded-full text-center w-[80%] pl-2" />
                                                                    <div className="text-left w-full pl-5 font-bold">Fecha Final:</div>
                                                                    <input
                                                                        value={fin ?? ''}
                                                                        type="date"
                                                                        onChange={(e) => handleFin(e)}
                                                                        className="bg-gray-300 h-8 rounded-full text-center w-[80%] pl-2" />
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <button className="justify-center flex items-center p-3 text-xl bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={fetchVentas}>
                                                                        <Icon icon="ri:save-line" />
                                                                        Buscar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="p-5 w-full h-min">
                                                                <div className="w-full py-2 pl-2 bg-gray-300 max-h-[300px] h-[200px] rounded-xl overflow-y-scroll custom-scrollbar">
                                                                    {ventas.map((venta, index) => (
                                                                        <VentaCliente key={index} venta={venta} index={index} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                            </>
                                        )}
                                    </div>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            {loading && <Loading />}
        </>
    );
}

export default VerCliente;