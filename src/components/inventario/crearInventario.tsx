"use client";

import { Dialog, Transition } from '@headlessui/react';
import React, { ChangeEvent, FC, Fragment, use, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Swal from 'sweetalert2';
import CategoriaSeleccionada from './categoriasSeleccionadas';
import SubcategoriaSeleccionar from './subcategoriasSeleccionar';
import CrearTalla from './crearTalla';

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface Talla {
    articulo: number;
    talla: string;
    cantidad: number;
}

interface Articate {
    articulo: number;
    categoria: number;
}

interface Articulo {
    nombre: string;
    descripcion: string;
    precioDetal: number | "";
    precioMayorista: number | "";
}

interface ArticuloCreado {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    articate: Categoria[] | null;
    tallas: Talla[] | null;
}

interface CrearInventarioProps {
    closeComponent: () => void;
    categorias: Categoria[];
    reload: () => void;
}

const CrearInventario: FC<CrearInventarioProps> = ({ closeComponent, categorias, reload }) => {

    const [articulo, setArticulo] = useState<Articulo>({
        nombre: "",
        descripcion: "",
        precioDetal: "",
        precioMayorista: ""
    });

    const [articuloCreado, setArticuloCreado] = useState<ArticuloCreado | null>(null);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        padre: "",
        hija: ""
    });
    const [articateList, setArticateList] = useState<Articate[]>([]);
    const [talla, setTalla] = useState<Talla>({
        articulo: 0,
        talla: "",
        cantidad: 0
    });
    const [tallaList, setTallaList] = useState<Talla[]>([]);
    // Function to close the modal
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };
    const [saving, setSaving] = useState(false);
    const handleSaving = (e: boolean) => {
        setSaving(e);
    }
    // Function to handle the article change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setArticulo({
            ...articulo, [e.target.name]: e.target.value
        });
    }
    // Function to handle the category change
    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "padre") {
            if (categoria.hija !== "") {
                setCategoria({
                    ...categoria,
                    id: 0,
                    [name]: value,
                    hija: ""
                });
            } else {
                setCategoria({
                    ...categoria, [name]: value
                });
            }
        } else if (name === "hija") {
            const selectedCategoria = categorias.find(c => c.hija === e.target.value && c.padre === categoria.padre);
            setCategoria({
                ...categoria,
                id: selectedCategoria ? selectedCategoria.id : 0,
                hija: e.target.value
            });
        }
    }
    // Function to handle the category save
    const handleCategoriaSave = () => {
        const foundCategoria = categoriasSeleccionadas.filter(c => c.padre === categoria.padre && c.hija === categoria.hija);
        if (foundCategoria.length == 0) {
            if (categoria.padre === "" || categoria.hija === "" || categoria.id === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor llene los campos de categoria!',
                });
            } else {
                setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
                setCategoria({
                    id: 0,
                    padre: categoria.padre,
                    hija: ""
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Subcategoria ya seleccionada!',
            });
            setCategoria({ ...categoria, hija: "" });
        }
    }
    // Function to filter unique categories
    const uniqueCategorias = categorias.filter((categoria, index, self) =>
        index === self.findIndex((c) => c.padre === categoria.padre)
    );
    // Function to filter categories
    const filteredCategorias = categorias.filter(categorias =>
        categorias.padre.toLowerCase().includes(categoria.padre.toLowerCase()) &&
        !(categoriasSeleccionadas.map(c => c.hija === categorias.hija && c.padre === categorias.padre).includes(true)) &&
        categoria.padre !== ""
    );
    // Function to eliminate a category selected
    const eliminarCategoria = (id: number) => {
        setCategoriasSeleccionadas(categoriasSeleccionadas.filter(c => c.id !== id));
    }
    // Function to handle the talla save
    const handleTallaSave = () => {
        if (talla.talla === "" || talla.cantidad === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene los campos de talla!',
            });
        } else {
            setTallaList([...tallaList, talla]);
            setTalla({
                articulo: 0,
                talla: "",
                cantidad: 0
            });
        }
    }
    // Function to handle the talla change
    const handleTallaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTalla({
            ...talla, [e.target.name]: e.target.value
        });
    }
    // Function to eliminate a talla selected
    const eliminarTalla = (index: number) => {
        setTallaList(tallaList.filter((t, i) => i !== index));
    }
    // Function to save the articate
    const articateSave = () => {
        const newArticateList = categoriasSeleccionadas.map((c, i) => ({
            articulo: articuloCreado ? articuloCreado.id : 0,
            categoria: c.id
        }));
        setArticateList(newArticateList);
    }
    // Function to update the talla list
    const updateTallaList = () => {
        const newTallaList = tallaList.map((t, i) => ({
            ...t, articulo: articuloCreado ? articuloCreado.id : 0
        }));
        setTallaList(newTallaList);
    }
    // Function to save the article
    const handleArticuloSave = async () => {
        handleSaving(true);
        if (articulo.nombre === "" || articulo.descripcion === "" || articulo.precioDetal === 0 || articulo.precioMayorista === 0 || categoriasSeleccionadas.length === 0 || tallaList.length === 0) {
            handleSaving(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene todos los campos de articulo!',
            });
        } else {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articulo/new`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(articulo)
                });
                const data = await res.json();
                setArticuloCreado(data);
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al crear el articulo!',
                });
            }
        }
    }
    // Function to update the articateList and tallaList
    useEffect(() => {
        if (articuloCreado?.id) {
            articateSave();
            updateTallaList();
        }
    }, [articuloCreado]);
    // Function to save the articate and talla
    useEffect(() => {
        if (articuloCreado?.id && articateList.length > 0 && tallaList.length > 0) {
            const saveArticateTalla = async () => {
                try {
                    const res1 = fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articate/new/list`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(articateList)
                    });
                    const res2 = fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/talla/new/list`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(tallaList)
                    });
                    const res1Result = await res1;
                    const res2Result = await res2;
                    if (res1Result.ok && res2Result.ok) {
                        handleSaving(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Articulo creado!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            reload();
                            closeComponent();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error al crear el articulo!',
                        });
                        setSaving(false);
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al crear el articulo!',
                    });
                    setSaving(false);
                }
            }
            saveArticateTalla();
        }
    }, [articateList, tallaList]);

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
                                    <div className={` absolute max-h-[80%] overflow-y-scroll custom-scrollbar top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[50%] w-[80%] bg-white rounded-lg pb-1 ${saving && "overflow-y-hidden"} `}>
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Anadir Producto</div>
                                        <div className="w-full flex justify-center items-center">
                                            <img className="object-cover" src="/modarly.jpeg" alt="user" width={250} />
                                        </div>
                                        <input title="archivo" type="file" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" />
                                        <div className="flex max-lg:flex-col w-full">
                                            <div className="w-full">
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Nombre:</div>
                                                    <input name="nombre" value={articulo.nombre} onChange={(e) => handleChange(e)} maxLength={200} id="nombre" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Chaqueta de Jean" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Descripcion:</div>
                                                    <textarea name="descripcion" value={articulo.descripcion} onChange={(e) => handleChange(e)} maxLength={500} id="descripcion" className="bg-black bg-opacity-10 h-8 rounded-3xl text-center w-[80%] pl-2" placeholder="descripcion" ></textarea>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Precio Detal:</div>
                                                    <input name="precioDetal" value={articulo.precioDetal} onChange={(e) => handleChange(e)} maxLength={10} id="precioDetal" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10000" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Precio Mayorista:</div>
                                                    <input name="precioMayorista" value={articulo.precioMayorista} onChange={(e) => handleChange(e)} maxLength={10} id="precioMayorista" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="8000" ></input>
                                                </div>
                                                <div className="text-left w-full pl-5">Categoria seleccionadas:</div>
                                                <div className="w-full justify-center px-10">
                                                    <div className="bg-black bg-opacity-10 h-20 overflow-y-scroll custom-scrollbar rounded-lg flex-wrap flex w-full ">
                                                        {categoriasSeleccionadas.map((c) => (
                                                            <CategoriaSeleccionada key={c.id} categoria={c} eliminarCategoria={eliminarCategoria} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full" >
                                                <div className="text-left w-full pl-5">Categoria:</div>
                                                <select title="categorias" name="padre" value={categoria.padre} onChange={handleCategoriaChange} id="padre" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2">
                                                    <option value="">Seleccione una Categoria</option>
                                                    {uniqueCategorias.map((c) => (
                                                        <option key={c.padre} value={c.padre}>{c.padre}</option>
                                                    ))}
                                                </select>
                                                <div className="text-left w-full pl-5">SubCategoria:</div>
                                                <select title="subcategorias" name="hija" value={categoria.hija} onChange={handleCategoriaChange} id="hija" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2">
                                                    <option value="">Seleccione una SubCategoria</option>
                                                    <SubcategoriaSeleccionar key={"1"} categorias={filteredCategorias} />
                                                </select>
                                                <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-lime-200 hover:bg-lime-300 rounded-lg" onClick={handleCategoriaSave}>
                                                        <Icon icon="ri:save-line" />
                                                        Guardar Categoria
                                                    </button>
                                                </div>
                                                <div className="text-left w-full pl-5">Tallas:</div>
                                                <div className="w-full justify-center px-10">
                                                    <div className="bg-black bg-opacity-10 pl-3 h-40 overflow-y-scroll custom-scrollbar rounded-lg w-full justify-center items-center ">
                                                        <table className={`justify-center items-center w-full`}>
                                                            <thead>
                                                                <tr>
                                                                    <th className="p-1">Talla</th>
                                                                    <th className="p-1">Cantidad</th>
                                                                    <th className="p-1">Accion</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <CrearTalla tallaList={tallaList} setTallaList={handleTallaSave} talla={talla} setTalla={handleTallaChange} eliminarTalla={eliminarTalla} />
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
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            {saving && <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-20">
                <div className={`p-10 flex-grow h-screen justify-center flex items-center`}>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default CrearInventario;