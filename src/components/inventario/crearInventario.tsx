"use client";

import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Swal from 'sweetalert2';
import CategoriaSeleccionada from './categoriasSeleccionadas';
import SubcategoriaSeleccionar from './subcategoriasSeleccionar';

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
    precioDetal: number;
    precioMayorista: number;
}

interface ArticuloCreado {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    categorias: Categoria[];
    tallas: Talla[];
}

interface CrearInventarioProps {
    closeComponent: () => void;
    categorias: Categoria[];
}

const CrearInventario: FC<CrearInventarioProps> = ({ closeComponent, categorias }) => {

    const [articulo, setArticulo] = useState<Articulo>({
        nombre: "",
        descripcion: "",
        precioDetal: 0,
        precioMayorista: 0
    });

    const [articuloCreado, setArticuloCreado] = useState<ArticuloCreado>();
    const [categoriapadre, setCategoriaPadre] = useState("");
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        padre: "",
        hija: ""
    });
    const [Articate, setArticate] = useState<Articate>({
        articulo: articuloCreado ? articuloCreado.id : 0,
        categoria: 0
    });
    const [articateList, setArticateList] = useState<Articate[]>([]);
    // Function to close the modal
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };
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
                                    <div className=" absolute max-h-dvh overflow-y-scroll custom-scrollbar top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[50%] w-[80%] bg-white rounded-lg pb-1  ">
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >Anadir Producto</div>
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
                                                    <div className="bg-black bg-opacity-10 h-20 overflow-y-scroll custom-scrollbar rounded-lg w-full justify-center items-center ">
                                                        XD
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" >
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

export default CrearInventario;