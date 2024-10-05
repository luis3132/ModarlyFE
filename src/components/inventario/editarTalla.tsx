import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ChangeEvent, FC, use, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Talla {
    id: number;
    articulo: number;
    talla: string;
    cantidad: number;
}

interface TallaProps {
    articuloTallas: Talla[];
    tallaNueva: (e: Talla) => void;
    borrarTallas: (e: Talla) => void;
    editarTalla: (e: Talla) => void;
}

const EditarTalla: FC<TallaProps> = ({ articuloTallas, tallaNueva, borrarTallas, editarTalla }) => {
    const [deploy, setDeploy] = useState(false);

    const [tallaEditable, setTallaEditable] = useState<Talla>({
        id: 9999,
        articulo: articuloTallas[0] ? articuloTallas[0].articulo : 0,
        talla: "",
        cantidad: 0
    });
    // Function to handle the talla change
    const handleTallaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTallaEditable({
            ...tallaEditable, [e.target.name]: e.target.value
        });
    }

    // Function to handle cancel button
    const handleCancel = () => {
        setTallaEditable({
            id: 9999,
            articulo: articuloTallas[0] ? articuloTallas[0].articulo : 0,
            talla: "",
            cantidad: 0
        });
        setDeploy(false);
    }

    return (
        <>
            {deploy && (
                <tr className="mb-2 bg-black bg-opacity-10">
                    <td>
                        <input name="talla" value={tallaEditable.talla} onChange={(e) => handleTallaChange(e)} maxLength={5} id="tallaNueva" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%]" placeholder="M" />
                    </td>
                    <td>
                        <input name="cantidad" value={tallaEditable.cantidad} onChange={(e) => handleTallaChange(e)} maxLength={5} id="cantidadNueva" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10" ></input>
                    </td>
                    <td className="flex flex-col">
                        <button className="justify-center flex items-center p-1 bg-lime-200 hover:bg-lime-300 rounded-lg" onClick={() => { tallaNueva(tallaEditable); handleCancel(); }}>
                            <Icon icon="ri:save-line" />
                            Guardar
                        </button>
                        <button className="justify-center flex items-center p-1 bg-red-400 hover:bg-red-500 rounded-lg" onClick={handleCancel}>
                            <Icon icon="line-md:cancel-twotone" />
                            Cancelar
                        </button>
                    </td>
                </tr>
            )}
            {!deploy && (
                <tr>
                    <td></td>
                    <td>
                        <button title="add" className="text-2xl" onClick={() => setDeploy(!deploy)}>
                            <Icon icon="bx:bxs-plus-circle" />
                        </button>
                    </td>
                    <td></td>
                </tr>
            )}
            {articuloTallas.map((t, index) => (
                <tr key={index} className="mb-2">
                    <Talla editarTalla={editarTalla} borrarTallas={borrarTallas} talla={t} />
                </tr>
            ))}
        </>
    )
}

// separate component for the Talla

interface SingleTallaProps {
    talla: Talla;
    borrarTallas: (e: Talla) => void;
    editarTalla: (e: Talla) => void;
}

const Talla: FC<SingleTallaProps> = ({ talla, borrarTallas, editarTalla }) => {
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }

    const [tallaEditable, setTallaEditable] = useState<Talla>(talla);
    // Function to handle the talla change
    const handleTallaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTallaEditable({
            ...tallaEditable, [e.target.name]: e.target.value
        });
    }

    // Function to handle cancel button
    const handleCancel = () => {
        setTallaEditable({
            id: talla.id,
            articulo: talla.articulo,
            talla: talla.talla,
            cantidad: talla.cantidad
        });
        setEdit(false);
    }

    // Function to delete the talla
    const borrarTalla = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                borrarTallas(talla);
                Swal.fire(
                    'Borrado!',
                    'La talla ha sido eliminada.',
                    'success'
                )
            }
        })
    }

    return (
        <>
            {edit ? (
                <>
                    <td>
                        <input name="talla" value={tallaEditable.talla} onChange={(e) => handleTallaChange(e)} maxLength={5} id="talla" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%]" placeholder="M" />
                    </td>
                    <td>
                        <input name="cantidad" value={tallaEditable.cantidad} onChange={(e) => handleTallaChange(e)} maxLength={5} id="cantidad" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10" ></input>
                    </td>
                    <td className="flex flex-col">
                        <button className="justify-center flex items-center p-1 bg-lime-200 hover:bg-lime-300 rounded-lg" onClick={()=>{editarTalla(tallaEditable); handleCancel();}} >
                            <Icon icon="ri:save-line" />
                            Guardar
                        </button>
                        <button className="justify-center flex items-center p-1 bg-red-400 hover:bg-red-500 rounded-lg" onClick={handleCancel}>
                            <Icon icon="line-md:cancel-twotone" />
                            Cancelar
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{talla.talla}</td>
                    <td>{talla.cantidad}</td>
                    <td className="flex justify-between">
                        <button title={`${talla.id}`} className="justify-center flex items-center text-xl h-8 w-8 mr-1 p-1 bg-lime-300 hover:bg-lime-400 rounded-lg" onClick={handleEdit}>
                            <Icon icon="lucide:edit" />
                        </button>
                        <button title={`${talla.id}`} className="justify-center flex items-center text-xl h-8 w-8 p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={borrarTalla}>
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </td>
                </>
            )}
        </>
    )
}

export default EditarTalla;