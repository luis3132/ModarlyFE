import { ChangeEvent, FC, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Talla {
    talla: string;
    cantidad: number;
}

interface Tallaprops {
    tallaList: Talla[];
    setTallaList: (talla: Talla[]) => void;
    talla: Talla;
    setTalla: (e: ChangeEvent<HTMLInputElement>) => void;
    eliminarTalla: (index: number) => void;
}

const CrearTalla: FC<Tallaprops> = ({ tallaList, setTallaList, talla, setTalla, eliminarTalla }) => {
    const [deploy, setDeploy] = useState(false);
    return (
        <>
            {tallaList.map((t, index) => (
                <tr key={index} className="mb-2">
                    <td>{t.talla}</td>
                    <td>{t.cantidad}</td>
                    <td>
                        <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => eliminarTalla(index)}>
                            <Icon icon="line-md:cancel-twotone" />
                            Eliminar
                        </button>
                    </td>
                </tr>
            ))}
            {deploy && (
                <tr className="mb-2">
                    <td>
                        <input name="talla" value={talla.talla} onChange={(e) => setTalla(e)} maxLength={5} id="talla" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="M" />
                    </td>
                    <td>
                        <input name="cantidad" value={talla.cantidad} onChange={(e) => setTalla(e)} maxLength={5} id="cantidad" type="number" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" placeholder="10" ></input>
                    </td>
                    <td>
                        <button className="justify-center flex items-center p-1 bg-lime-200 hover:bg-lime-300 rounded-lg" onClick={() => { setTallaList([...tallaList, talla]); setDeploy(false) }}>
                            <Icon icon="ri:save-line" />
                            Guardar
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
        </>
    )
}

export default CrearTalla;