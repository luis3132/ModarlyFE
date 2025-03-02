import React, { FC, useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { Delete } from "@/lib/scripts/fetch";
import { Categoria } from "@/lib/types/types";
import { ReloadContext } from "@/lib/hooks/reload";
import EditarCategoria from "./editarCategoria";

interface CategoriasProps {
    categoria: Categoria;
    index: number;
}

const ListarCategoria: FC<CategoriasProps> = ({ categoria, index }) => {

    const [showEditCategoria, setShowEditCategoria] = useState(false);
    const { update } = useContext(ReloadContext);

    const handleDelete = () => {
        if (categoria.hija) {
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
                }
            });
            return;
        }
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Si eliminas esta categoria, tambien se eliminaran las subCategorias!!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategoria();
            }
        })
    }

    const handleEdit = () => {
        setShowEditCategoria(!showEditCategoria);
    }

    const deleteCategoria = async () => {
        try {
            const { status } = await Delete(`/api/categoria/delete/${categoria.id}`);
            if (status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal!',
                });
                return;
            }
            Swal.fire(
                'Eliminado!',
                'La categoria ha sido eliminada.',
                'success'
            ).then(() => {
                update();
            });
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
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
                <EditarCategoria categoria={categoria} closeComponent={handleEdit} />
            )}
        </>
    );
}

export default ListarCategoria;