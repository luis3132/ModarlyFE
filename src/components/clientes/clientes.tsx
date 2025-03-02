import { Cliente } from "@/lib/types/types";
import React, { FC, useState } from "react";
import VerCliente from "./verCliente";

interface ClientesProps {
    cliente: Cliente;
}

const Clientes: FC<ClientesProps> = ({cliente}) => {
    const [showCliente, setShowCliente] = useState(false);

    const handShowCliente = () => {
        setShowCliente(!showCliente);
    };

    return (
        <>
            <div key={cliente.cedula} className="bg-white shadow-lg flex flex-col rounded-lg h-fit p-5 m-5 min-w-max sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ">
                <h1 className="text-2xl font-bold">{cliente.nombres} {cliente.apellidos}</h1>
                <h2 className="text-lg font-semibold">{cliente.cedula}</h2>
                <p className="text-lg">{cliente.mayorista ? "Mayorista" : "Minorista"}</p>
                <button type="button" title="show" className="bg-blue-500 text-white p-2 rounded-lg self-end mt-auto " onClick={handShowCliente}>Ver mas</button>
            </div>
            {showCliente && (
                <VerCliente cliente={cliente} closeComponent={handShowCliente} />
            )}
        </>
    );
}

export default Clientes;