"use client";

import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import React, { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Swal from 'sweetalert2';
import { ArticuloCreate, TallaCreate } from '@/lib/types/types';
import Image from 'next/image';
import { ReloadContext } from '@/lib/hooks/reload';
import { CategoriasContext } from '@/lib/hooks/categorias';
import Loading from '../extra/loading';
import { Post } from '@/lib/scripts/fetch';
import RegistrarTalla from './registrarTalla';
import SeleccionarSubCategoria from './seleccionarSubCategoria';
import CategoriaSeleccionada from './categoriasSeleccionadas';

interface CrearInventarioProps {
    closeComponent: () => void;
}

const RegistrarInventario: FC<CrearInventarioProps> = ({ closeComponent }) => {
    // Contexts
    const { update, loading, loadingUpdate } = useContext(ReloadContext);
    const { categorias } = useContext(CategoriasContext);

    const [articulo, setArticulo] = useState<ArticuloCreate>({
        nombre: "",
        descripcion: "",
        precioDetal: "",
        precioMayorista: "",
        estado: true,
        categorias: [],
        tallas: []
    });
    const [talla, setTalla] = useState<TallaCreate>({
        articulo: 0,
        talla: "",
        cantidad: "",
        estado: true
    });
    const [categoria, setCategoria] = useState({ padre: "", hija: "" });
    // Function to close the modal
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };
    // Function to filter unique categories
    const uniqueCategorias = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre)
    );
    // Function to filter categories
    const filteredCategorias = categorias.filter(categorias =>
        categorias.padre.toLowerCase().includes(categoria.padre.toLowerCase()) &&
        !(articulo.categorias.map(c => c === categorias.id).includes(true)) &&
        categoria.padre !== ""
    );
    // Function to handle the article change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setArticulo({
            ...articulo, [e.target.name]: e.target.value
        });
    }
    // Function to handle the category change
    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === "padre") {
            setCategoria({
                ...categoria, padre: e.target.value, hija: ""
            });
            return;
        }
        setCategoria({
            ...categoria, hija: e.target.value
        });
    }
    // Function to save the category
    const handleCategoriaSave = () => {
        if (categoria.padre === "" || categoria.hija === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene todos los campos de categoria!',
            });
            return;
        }
        setArticulo({
            ...articulo,
            categorias: [...articulo.categorias, categorias.find(c => c.padre === categoria.padre && c.hija === categoria.hija)?.id || 0]
        });
        setCategoria({
            padre: "",
            hija: ""
        });
    }
    // Function to eliminate a category selected
    const eliminarCategoria = (id: number) => {
        setArticulo({
            ...articulo,
            categorias: articulo.categorias.filter(c => c !== id)
        });
    }
    // Function to handle the talla change
    const handleTallaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTalla({
            ...talla, [e.target.name]: e.target.value
        });
    }
    // Function to save the talla
    const handleTallaSave = () => {
        if (talla.talla === "" || talla.cantidad === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene todos los campos de talla!',
            });
            return;
        }
        setArticulo({
            ...articulo,
            tallas: [...articulo.tallas, talla]
        });
        setTalla({
            articulo: 0,
            talla: "",
            cantidad: 0,
            estado: true
        });
    }
    // Function to eliminate a talla selected
    const eliminarTalla = (index: number) => {
        setArticulo({
            ...articulo,
            tallas: articulo.tallas.filter((t, i) => i !== index)
        });
    }
    // Function to save the article
    const handleArticuloSave = async () => {
        loadingUpdate(true);
        if (articulo.nombre === "" || articulo.descripcion === "" || articulo.precioDetal === 0 || articulo.precioMayorista === 0 || articulo.categorias.length === 0 || articulo.tallas.length === 0) {
            loadingUpdate(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene todos los campos de articulo!',
            });
            return;
        }
        try {
            const { status } = await Post("/api/articulo/new", articulo);
            if (status === 200) {
                loadingUpdate(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Articulo guardado con exito!',
                }).then(() => {
                    update();
                    closeModal();
                });
                return;
            }
        } catch (e) {
            console.error(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear el articulo!',
            });
        }
    }
    console.log(articulo);

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
                                    <div className={` absolute max-h-[80%] overflow-y-scroll custom-scrollbar top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[50%] w-[80%] bg-white rounded-lg pb-1 ${loading && "overflow-y-hidden"} `}>
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Anadir Producto</div>
                                        <div className="w-full flex justify-center items-center">
                                            <Image src="/modarly.jpeg" alt="user" className="object-cover" width={300} height={300} />
                                        </div>
                                        <input title="archivo" type="file" className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" />
                                        <div className="flex max-lg:flex-col w-full">
                                            <div className="w-full">
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Nombre:</div>
                                                    <input name="nombre" value={articulo.nombre} onChange={(e) => handleChange(e)} maxLength={200} id="nombre" type="text" className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Chaqueta de Jean" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Descripcion:</div>
                                                    <textarea name="descripcion" value={articulo.descripcion} onChange={(e) => handleChange(e)} maxLength={500} id="descripcion" className="bg-gray-200 h-8 rounded-3xl text-center w-[80%] pl-2" placeholder="descripcion" ></textarea>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Precio Detal:</div>
                                                    <input name="precioDetal" value={articulo.precioDetal} onChange={(e) => handleChange(e)} maxLength={10} id="precioDetal" type="number" className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10000" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Precio Mayorista:</div>
                                                    <input name="precioMayorista" value={articulo.precioMayorista} onChange={(e) => handleChange(e)} maxLength={10} id="precioMayorista" type="number" className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2" placeholder="8000" ></input>
                                                </div>
                                                <div className="text-left w-full pl-5">Categoria seleccionadas:</div>
                                                <div className="w-full justify-center px-10">
                                                    <div className="bg-gray-200 h-20 overflow-y-scroll custom-scrollbar rounded-lg flex-wrap flex w-full ">
                                                        {articulo.categorias.map((c) => (
                                                            <CategoriaSeleccionada key={c} categoria={c} eliminarCategoria={eliminarCategoria} categorias={categorias} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full" >
                                                <div className="text-left w-full pl-5">Categoria:</div>
                                                <select
                                                    title="categorias"
                                                    name="padre"
                                                    value={categoria.padre}
                                                    onChange={handleCategoriaChange}
                                                    id="padre"
                                                    className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2">
                                                    <option value="">Seleccione una Categoria</option>
                                                    {uniqueCategorias.map((c) => (
                                                        <option key={c.padre} value={c.padre}>{c.padre}</option>
                                                    ))}
                                                </select>
                                                <div className="text-left w-full pl-5">SubCategoria:</div>
                                                <select
                                                    title="subcategorias"
                                                    name="hija"
                                                    value={categoria.hija}
                                                    onChange={handleCategoriaChange}
                                                    id="hija"
                                                    className="bg-gray-200 h-8 rounded-full text-center w-[80%] pl-2">
                                                    <option value="">Seleccione una SubCategoria</option>
                                                    <SeleccionarSubCategoria key={"1"} categorias={filteredCategorias} />
                                                </select>
                                                <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-lime-200 hover:bg-lime-300 rounded-lg" onClick={handleCategoriaSave}>
                                                        <Icon icon="ri:save-line" />
                                                        Guardar Categoria
                                                    </button>
                                                </div>
                                                <div className="text-left w-full pl-5">Tallas:</div>
                                                <div className="w-full justify-center px-10">
                                                    <div className="bg-gray-200 pl-3 h-40 overflow-y-scroll custom-scrollbar rounded-lg w-full justify-center items-center ">
                                                        <table className={`justify-center items-center w-full`}>
                                                            <thead>
                                                                <tr>
                                                                    <th className="p-1">Talla</th>
                                                                    <th className="p-1">Cantidad</th>
                                                                    <th className="p-1">Accion</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <RegistrarTalla articulo={articulo} setTallaList={handleTallaSave} talla={talla} setTalla={handleTallaChange} eliminarTalla={eliminarTalla} />
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-row justify-center w-full flex items-center pt-2 pb-2 ">
                                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleArticuloSave} >
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
            {loading && <Loading />}
        </>
    )
}

export default RegistrarInventario;