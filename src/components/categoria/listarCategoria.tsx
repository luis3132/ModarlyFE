import React, { FC, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import EditarCategoria from "./editarCategoria";

interface Categoria {
    id: number;
    padre: string;
    hija: string;
}

interface CategoriasProps {
    categoria: Categoria;
    index: number;
    setReload: () => void;
    categorias: Categoria[];
}

const ListarCategoria: FC<CategoriasProps> = ({ categoria, index, setReload, categorias }) => {

    const [showEditCategoria, setShowEditCategoria] = useState(false);

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategoria();
                Swal.fire(
                    'Eliminado!',
                    'La categoria ha sido eliminada.',
                    'success'
                ).then(() => {
                    setReload();
                });
            }
        })
    }

    const handleEdit = () => {
        setShowEditCategoria(!showEditCategoria);
    }

    const deleteCategoria = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/categoria/delete/${categoria.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <tr className={`h-12 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"}`} key={categoria.id}>
                <td className="text-center">{categoria.id}</td>
                <td className="text-center">{categoria.padre}</td>
                <td className="text-center">{categoria.hija}</td>
                <td className="">
                    <div className="flex justify-center">
                        <button className="items-center flex bg-green-400 hover:bg-green-500 rounded-lg p-1" onClick={handleEdit}>
                            <Icon icon="lucide:edit" />
                            Editar</button>
                        <div className="w-2"></div>
                        <button className="items-center  flex bg-red-400 hover:bg-red-500 rounded-lg p-1" onClick={handleDelete}>
                            <Icon icon="material-symbols:delete-outline" />
                            Eliminar</button>
                    </div>
                </td>
            </tr>
            {showEditCategoria && (
                <EditarCategoria categoria={categoria} setReload={setReload} closeComponent={handleEdit} categorias={categorias} />
            )}
        </>
    );
}

export default ListarCategoria;