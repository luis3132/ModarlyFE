import { Dialog, Transition } from '@headlessui/react';
import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import CategoriaSeleccionada from './categoriasSeleccionadas';
import SubcategoriaSeleccionar from './subcategoriasSeleccionar';
import Swal from 'sweetalert2';
import EditarTalla from './editarTalla';

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface Talla {
    id: number;
    articulo: number;
    talla: string;
    cantidad: number;
}

interface TallaNueva {
    articulo: number;
    talla: string;
    cantidad: number;
}

interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    categorias: Categoria[];
    tallas: Talla[];
}

interface ArticuloResponse {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    categorias: Categoria[] | null;
    tallas: Talla[] | null;
}

interface Articate {
    articulo: number;
    categoria: number;
}

interface EditArticulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
}

interface VerInventarioProps {
    articulo: Articulo;
    closeComponent: () => void;
    categorias: Categoria[];
    reload: () => void;
}

const VerInventario: FC<VerInventarioProps> = ({ closeComponent, articulo, categorias, reload }) => {
    // Function to close the modal
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    // Response
    const [ok, setOk] = useState(true);
    const [articuloResponse, setArticuloResponse] = useState<ArticuloResponse | null>(null)
    const [categoriaResponse, setCategoriaResponse] = useState<Articate[] | null>(null);
    const [borrarCategoriasResponse, setBorrarCategoriasResponse] = useState<boolean[] | null>(null);
    const [tallaResponse, setTallaResponse] = useState<Talla[] | null>(null);
    const [borrarTallaResponse, setBorrarTallaResponse] = useState<boolean[] | null>(null);
    const [editarTallaResponse, setEditarTallaResponse] = useState<Talla[] | null>(null);

    // Function to edit the data
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }
    const [saving, setSaving] = useState(false);
    const handleSaving = (e: boolean) => {
        setSaving(e);
    }



    // Editable Article
    const [articulo1, setArticulo1] = useState<EditArticulo>({
        id: articulo.id,
        nombre: articulo.nombre,
        descripcion: articulo.descripcion,
        precioDetal: articulo.precioDetal,
        precioMayorista: articulo.precioMayorista
    });
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        padre: "",
        hija: ""
    });
    const [articate, setArticate] = useState<Articate>({
        articulo: articulo.id,
        categoria: 0
    });



    // Categories for this Article
    const [articuloCategorias, setArticuloCategorias] = useState<Categoria[]>(articulo.categorias); // Actual categories for this Article
    const [categoriasNuevas, setCategoriasNuevas] = useState<Articate[]>([]); // New categories
    const [borrarCategorias, setBorrarCategorias] = useState<Articate[]>([]); // Delete the already saved categories

    // Sizes for this Article
    const [articuloTallas, setArticuloTallas] = useState<Talla[]>(articulo.tallas); // Actual sizes for this Article
    const [tallasNuevas, setTallasNuevas] = useState<TallaNueva[]>([]); // New sizes
    const [editarTallas, setEditarTallas] = useState<Talla[]>([]); // Edit the already saved sizes
    const [borrarTallas, setBorrarTallas] = useState<number[]>([]); // Delete the already saved sizes



    // Function to reset the data
    const reset = () => {
        setArticulo1({
            id: articulo.id,
            nombre: articulo.nombre,
            descripcion: articulo.descripcion,
            precioDetal: articulo.precioDetal,
            precioMayorista: articulo.precioMayorista
        });
        setCategoria({
            id: 0,
            padre: "",
            hija: ""
        });
        setArticuloCategorias(articulo.categorias);
        setArticuloTallas(articulo.tallas);
        setBorrarCategorias([]);
        setBorrarTallas([]);
        setCategoriasNuevas([]);
        setTallasNuevas([]);
        setEditarTallas([]);
    }



    // Function to handle the article change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setArticulo1({
            ...articulo1, [e.target.name]: e.target.value
        });
    }



    // Function to delete a category
    const eliminarCategoria = (id: number) => {
        setArticate({ ...articate, categoria: id });  // Set the category to delete
        setArticuloCategorias(articuloCategorias.filter(c => c.id !== id)); // Remove the category from the list
        setCategoriasNuevas(categoriasNuevas.filter(c => c.categoria !== id));  // Remove the category from the new categories
    }
    // Function to delete a category from the list
    useEffect(() => {
        if (articate.categoria !== 0) {
            if (articulo.categorias.map(c => c.id === articate.categoria).includes(true)) { // If the category is already saved
                setBorrarCategorias([...borrarCategorias, articate]); // Add the category to delete 
            }
            setArticate({ ...articate, categoria: 0 }); // Reset the category to delete
        }
    }, [articate]);



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
        const foundCategoria = articuloCategorias.filter(c => c.padre === categoria.padre && c.hija === categoria.hija);
        if (foundCategoria.length == 0) {
            if (categoria.padre === "" || categoria.hija === "" || categoria.id === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor llene los campos de categoria!',
                });
            } else {
                setArticuloCategorias([...articuloCategorias, categoria]);
                setCategoriasNuevas([...categoriasNuevas, {
                    articulo: articulo.id,
                    categoria: categoria.id
                }]);
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
        !(articuloCategorias.map(c => c.hija === categorias.hija && c.padre === categorias.padre).includes(true)) &&
        categoria.padre !== ""
    );



    // Tallas
    // Function to handle the new talla
    const handleTallasNuevas = (talla: Talla) => {
        if (articuloTallas.map(t => t.talla === talla.talla).includes(true)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Talla ya Existe!',
            });
        } else {
            setArticuloTallas([...articuloTallas, talla]);
            setTallasNuevas([...tallasNuevas, {
                articulo: talla.articulo,
                talla: talla.talla,
                cantidad: talla.cantidad
            }]);
        }
    }
    // Function to delete a talla
    const eliminarTalla = (talla: Talla) => {
        setArticuloTallas(articuloTallas.filter(t => t.id !== talla.id && t.talla !== talla.talla));
        setTallasNuevas(tallasNuevas.filter(t => t.talla !== talla.talla));
        if (talla.id !== 9999) {
            setBorrarTallas([...borrarTallas, talla.id]);
        }
    }
    // Function to edit a talla
    const editarTalla = (talla: Talla) => {
        if (talla.id === 9999) {
            setArticuloTallas(articuloTallas.map(t =>
                t.id === 9999 ? talla : t
            ));
            setTallasNuevas(tallasNuevas.map(t =>
                t.talla === talla.talla ? {
                    articulo: talla.articulo,
                    talla: talla.talla,
                    cantidad: talla.cantidad
                } : t
            ));
        } else {
            setArticuloTallas(articuloTallas.map(t =>
                t.id === talla.id ? talla : t
            ));
            if (editarTallas.map(t => t.id === talla.id).includes(true)) {
                setEditarTallas(editarTallas.map(t =>
                    t.id === talla.id ? talla : t
                ));
            } else {
                setEditarTallas([...editarTallas, talla]);
            }
        }
    }



    // Eliminate Article
    // Function to eliminate the article
    const handleDelete = () => {
        handleSaving(true);
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteArticle();
            }
        });
    }
    const deleteArticle = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articulo/delete/${articulo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                handleSaving(false);
                reload();
                Swal.fire(
                    'Eliminado!',
                    'El articulo ha sido eliminado.',
                    'success'
                );
                closeModal();
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
        }
    }



    // Save changes
    // Function to save article
    const updateArticle = () => {
        handleSaving(true);
        if (articulo1.nombre === articulo.nombre && articulo1.descripcion === articulo.descripcion && articulo1.precioDetal === articulo.precioDetal && articulo1.precioMayorista === articulo.precioMayorista && categoriasNuevas.length === 0 && borrarCategorias.length === 0 && tallasNuevas.length === 0 && editarTallas.length === 0 && borrarTallas.length === 0) {
            handleSaving(false);
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'No hay cambios!',
            });
        } else {
            if (articulo1.nombre !== articulo.nombre || articulo1.descripcion !== articulo.descripcion || articulo1.precioDetal !== articulo.precioDetal || articulo1.precioMayorista !== articulo.precioMayorista) {
                saveArticle();
            }
            if (categoriasNuevas.length !== 0) {
                saveCategorias();
            }
            if (borrarCategorias.length !== 0) {
                deleteCategorias();
            }
            if (tallasNuevas.length !== 0) {
                saveTallas();
            }
            if (editarTallas.length !== 0) {
                saveTallasEditadas();
            }
            if (borrarTallas.length !== 0) {
                deleteTallas();
            }
        }
    }

    // save article
    const saveArticle = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articulo/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(articulo1)
            });
            if (response.ok) {
                setArticuloResponse(await response.json());
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
                setOk(false);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
            setOk(false);
        }
    }

    // save categories
    const saveCategorias = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articate/new/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoriasNuevas)
            });
            if (response.ok) {
                setCategoriaResponse(await response.json());
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
                setOk(false);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
            setOk(false);
        }
    }

    // Delete categories
    const deleteCategorias = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/articate/delete/list`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(borrarCategorias)
            });
            if (response.ok) {
                setBorrarCategoriasResponse(await response.json());
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
                setOk(false);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
            setOk(false);
        }
    }

    // Add sizes
    const saveTallas = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/talla/new/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tallasNuevas)
            });
            if (response.ok) {
                setTallaResponse(await response.json());
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
                setOk(false);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
            setOk(false);
        }
    }

    // Edit sizes
    const saveTallasEditadas = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/talla/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editarTallas)
            });
            if (response.ok) {
                setEditarTallaResponse(await response.json());
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
                setOk(false);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
            setOk(false);
        }
    }

    // Delete sizes
    const deleteTallas = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/talla/delete/list`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(borrarTallas)
            });
            if (response.ok) {
                setBorrarTallaResponse(await response.json());
            } else {
                handleSaving(false);
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.detail,
                });
                setOk(false);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
            setOk(false);
        }
    }

    useEffect(() => {
        if (articulo1.id === articulo.id && articulo1.nombre === articulo.nombre && articulo1.descripcion === articulo.descripcion && articulo1.precioDetal === articulo.precioDetal && articulo1.precioMayorista === articulo.precioMayorista && categoriasNuevas.length === 0 && borrarCategorias.length === 0 && tallasNuevas.length === 0 && editarTallas.length === 0 && borrarTallas.length === 0) {
            reload();
        } else {
            if (ok) {
                handleSaving(false);
                reload();
                Swal.fire(
                    'Guardado!',
                    'El articulo ha sido guardado.',
                    'success'
                );
                closeModal();
            } else {
                handleSaving(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!',
                });
            }
        }
    }, [articuloResponse, categoriaResponse, borrarCategoriasResponse, tallaResponse, borrarTallaResponse, editarTallaResponse]);


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
                                    <div className=" absolute max-h-[80%] overflow-y-scroll custom-scrollbar top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[50%] w-[80%] bg-white rounded-lg pb-1 ">
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10" >{articulo.nombre}</div>
                                        <div className="w-full flex justify-center items-center">
                                            <img className="object-cover" src="/modarly.jpeg" alt="user" width={250} />
                                        </div>
                                        {edit ? (
                                            <>
                                                <input title="archivo" type="file" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" />
                                                <div className="w-full flex justify-center items-center">
                                                    <div className="flex max-lg:flex-col w-full">
                                                        <div className="w-full">
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Nombre:</div>
                                                                <input name="nombre" value={articulo1.nombre} onChange={(e) => handleChange(e)} maxLength={200} id="nombre" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Chaqueta de Jean" ></input>
                                                            </div>
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Descripcion:</div>
                                                                <textarea name="descripcion" value={articulo1.descripcion} onChange={(e) => handleChange(e)} maxLength={500} id="descripcion" className="bg-black bg-opacity-10 h-8 rounded-3xl text-center w-[80%] pl-2" placeholder="descripcion" ></textarea>
                                                            </div>
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Precio Detal:</div>
                                                                <input name="precioDetal" value={articulo1.precioDetal} onChange={(e) => handleChange(e)} maxLength={10} id="precioDetal" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10000" ></input>
                                                            </div>
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Precio Mayorista:</div>
                                                                <input name="precioMayorista" value={articulo1.precioMayorista} onChange={(e) => handleChange(e)} maxLength={10} id="precioMayorista" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="8000" ></input>
                                                            </div>
                                                            <div className="text-left w-full pl-5">Categoria seleccionadas:</div>
                                                            <div className="w-full justify-center px-10">
                                                                <div className="bg-black bg-opacity-10 h-20 overflow-y-scroll custom-scrollbar rounded-lg flex-wrap flex w-full ">
                                                                    {articuloCategorias.map((c) => (
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
                                                                <div className="bg-black bg-opacity-10 h-40 overflow-y-scroll custom-scrollbar rounded-lg w-full justify-center items-center ">
                                                                    <table className={`justify-center items-center w-full`}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="p-1">Talla</th>
                                                                                <th className="p-1">Cantidad</th>
                                                                                <th className="p-1">Accion</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <EditarTalla articuloTallas={articuloTallas} tallaNueva={handleTallasNuevas} borrarTallas={eliminarTalla} editarTalla={editarTalla} />
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-row justify-center w-full flex items-center py-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={handleDelete} >
                                                        <Icon icon="material-symbols:delete-outline" />
                                                        Eliminar
                                                    </button>
                                                    <div className="w-[10%] "></div>
                                                    <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={updateArticle} >
                                                        <Icon icon="ri:save-line" />
                                                        Guardar
                                                    </button>
                                                    <div className="w-[10%] "></div>
                                                    <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => { handleEdit(); reset(); }}>
                                                        <Icon icon="line-md:cancel-twotone" />
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-full flex justify-center items-center">
                                                    <div className="flex max-lg:flex-col w-full">
                                                        <div className="w-full">
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Nombre:</div>
                                                                <input name="nombre" value={articulo.nombre} disabled maxLength={200} id="nombre1" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="Chaqueta de Jean" ></input>
                                                            </div>
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Descripcion:</div>
                                                                <textarea name="descripcion" value={articulo.descripcion} maxLength={500} disabled id="descripcion1" className="bg-black bg-opacity-10 h-8 rounded-3xl text-center w-[80%] pl-2" placeholder="descripcion" ></textarea>
                                                            </div>
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Precio Detal:</div>
                                                                <input name="precioDetal" value={articulo.precioDetal} maxLength={10} disabled id="precioDetal1" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10000" ></input>
                                                            </div>
                                                            <div className="" >
                                                                <div className="text-left w-full pl-5">Precio Mayorista:</div>
                                                                <input name="precioMayorista" value={articulo.precioMayorista} maxLength={10} disabled id="precioMayorista1" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="8000" ></input>
                                                            </div>
                                                        </div>
                                                        <div className="w-full" >
                                                            <div className="text-left w-full pl-5">Categoria seleccionadas:</div>
                                                            <div className="w-full justify-center px-10">
                                                                <div className="bg-black bg-opacity-10 max-h-40 overflow-y-scroll custom-scrollbar rounded-lg w-full justify-center items-center ">
                                                                    <table className={`justify-center items-center w-full mb-2`}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="p-1">Categoria</th>
                                                                                <th className="p-1">SubCategoria</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {articulo.categorias.map((c, index) => (
                                                                                <tr key={index} className="mb-2">
                                                                                    <td>{c.padre}</td>
                                                                                    <td>{c.hija}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div className="text-left w-full pl-5">Tallas:</div>
                                                            <div className="w-full justify-center px-10">
                                                                <div className="bg-black bg-opacity-10 max-h-40 overflow-y-scroll custom-scrollbar rounded-lg w-full justify-center items-center ">
                                                                    <table className={`justify-center items-center w-full mb-2`}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="p-1">Talla</th>
                                                                                <th className="p-1">Cantidad</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {articulo.tallas.map((t, index) => (
                                                                                <tr key={index} className="mb-2">
                                                                                    <td>{t.talla}</td>
                                                                                    <td>{t.cantidad}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-row justify-center w-full flex items-center py-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleEdit} >
                                                        <Icon icon="lucide:edit" />
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

export default VerInventario;