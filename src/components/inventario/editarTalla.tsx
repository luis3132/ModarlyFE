import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, FC, use, useEffect, useState } from "react";

interface Talla {
    id: number;
    articulo: number;
    talla: string;
    cantidad: number;
}

interface TallaProps {
    articuloTalla: Talla[];
    changeTalla: (e: ChangeEvent<HTMLInputElement>) => void;
    tallaEditable: Talla;
    setTalla: (e:Talla)=>void;
}

const EditarTalla: FC<TallaProps> = ({ articuloTalla, changeTalla, tallaEditable, setTalla }) => {
    const [deploy, setDeploy] = useState(false);
    return (
        <>
            {articuloTalla.map((t, index) => (
                <tr key={index} className="mb-2">
                    <Talla setTalla={setTalla} tallaEditable={tallaEditable} changeTalla={changeTalla} talla={t} />
                </tr>
            ))}
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
        </>
    )
}

// separate component for the Talla

interface SingleTallaProps {
    talla: Talla;
    changeTalla: (e: ChangeEvent<HTMLInputElement>) => void;
    tallaEditable: Talla;
    setTalla: (e:Talla)=>void;
}

const Talla: FC<SingleTallaProps> = ({ talla, changeTalla, tallaEditable, setTalla }) => {
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }
    

    return (
        <>
            {edit ? (
                <>
                    <td>
                        <input name="talla" value={tallaEditable.talla} onChange={(e) => changeTalla(e)} maxLength={5} id="talla" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%]" placeholder="M" />
                    </td>
                    <td>
                        <input name="cantidad" value={tallaEditable.cantidad} onChange={(e) => changeTalla(e)} maxLength={5} id="cantidad" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10" ></input>
                    </td>
                    <td className="flex flex-col">
                        <button className="justify-center flex items-center p-1 bg-lime-200 hover:bg-lime-300 rounded-lg" onClick={() => setEdit(false)}>
                            <Icon icon="ri:save-line" />
                            Guardar
                        </button>
                        <button className="justify-center flex items-center p-1 bg-red-400 hover:bg-red-500 rounded-lg" onClick={() => { setEdit(false); }}>
                            <Icon icon="line-md:cancel-twotone" />
                            Cancelar
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{talla.talla}</td>
                    <td>{talla.cantidad}</td>
                    <td className="flex">
                        <button title={`${talla.id}`} className="justify-center flex items-center text-xl h-8 w-8 mr-1 p-1 bg-lime-300 hover:bg-lime-400 rounded-lg" onClick={handleEdit}>
                            <Icon icon="lucide:edit" />
                        </button>
                        <button title={`${talla.id}`} className="justify-center flex items-center text-xl h-8 w-8 p-1 bg-red-500 hover:bg-red-600 rounded-lg">
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </td>
                </>
            )}
        </>
    )
}

export default EditarTalla;