import { Icon } from "@iconify/react/dist/iconify.js"
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import Swal from "sweetalert2"
import PagoItems from "../facturacion/pagoItems";

interface Venttall {
    venta: number;
    talla: number;
    cantidad: number;
    precioFinal: number;
}

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

interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    categorias: Categoria[];
    tallas: Talla[];
}

interface ResumenCompraProps {
    deploy: boolean;
    setDeploy: () => void;
    venttall: Venttall[] | null;
    articulo: Articulo[];
    mayorista: boolean;
    setVenttall: (venttall: Venttall[]) => void;
    deleteVenttall: (id: number) => void;
    reload: () => void;
}

const ResumenCompra: FC<ResumenCompraProps> = ({ deploy, setDeploy, venttall, articulo, mayorista, setVenttall, deleteVenttall, reload }) => {

    const [show, setShow] = useState(false);
    const [height, setHeight] = useState("hidden");
    const [pago, setPago] = useState(false);

    const handlePago = () => {
        setPago(!pago);
    }

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        if (venttall?.length !== 0) {
            if (show) {
                setHeight("bottom-0");
            } else {
                setHeight("-bottom-[93%]");
            }
        } else {
            setHeight("-bottom-[100%]");
        }
    }, [show, venttall]);

    const handleSumit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const updatedVenttallList: Venttall[] = [];
        var update: boolean = false;

        Array.from(formData.entries()).forEach(([key, value]) => {
            const precio = parseInt(value as string, 10);
            const id = parseInt(key);
            const venta = venttall?.find((venttall) => venttall.talla === id);
            const cantidad = venta?.cantidad;
            const art = articulo.find((art) => art.tallas.find((talla) => talla.id === id));
            var mar = (art?.precioMayorista ?? 0) * (cantidad ?? 0);
            var tal = (art?.precioDetal ?? 0) * (cantidad ?? 0);

            if (precio > 0) {
                const venttall: Venttall = {
                    venta: 0, // Replace with actual venta value
                    talla: id,
                    cantidad: cantidad ?? 0,
                    precioFinal: precio, // Replace with actual precioFinal value
                };
                updatedVenttallList.push(venttall);
                if (precio !== mar && precio !== tal) update = true;
            }
        });

        if (update) {
            setVenttall(updatedVenttallList);
            Swal.fire({
                icon: 'success',
                title: 'Modificado los precios con exito!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setPago(true);
            });
        } else {
            setVenttall(updatedVenttallList);
            setPago(true);
        }
    }

    return (
        <>
            <div className={`min-w-96 max-w-96 shadow-2xl shadow-gray-600 max-md:hidden max-h-screen bg-purple-200 ml-auto fixed top-0 h-dvh duration-500 ${deploy ? "right-0" : "-right-96"} `}>
                <div className="px-5 pt-11 h-inherit">
                    <div className="w-full flex justify-center items-center">
                        <div className="text-2xl flex items-center font-bold justify-center">
                            <Icon icon="mdi:cart" />
                            Carrito
                        </div>
                        <button title="close" className=" flex items-center pr-1 pt-1" onClick={setDeploy}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                    </div>
                    <div className="flex flex-col max-h-[80%] h-[80%] overflow-y-scroll custom-scrollbar mt-1">
                        <form id="carrito" onSubmit={handleSumit}>
                            {venttall?.map((venttall, i) => {
                                if (articulo !== undefined) {
                                    return (
                                        <Carrito deleteVenttall={deleteVenttall} venttall={venttall} articulo={articulo} mayorista={mayorista} key={i} />
                                    )
                                }
                            })
                            }
                        </form>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="text-lg">Total sin modificar:</div>
                            <div className="text-lg">
                                {venttall?.reduce((total, i) => {
                                    var articuloAct = articulo.find((art) => art.tallas.find((talla) => talla.id === i.talla));
                                    var mar = (articuloAct?.precioMayorista ?? 0) * i.cantidad;
                                    var tal = (articuloAct?.precioDetal ?? 0) * i.cantidad;
                                    if (mayorista) {
                                        return total + mar;
                                    } else {
                                        return total + tal;
                                    }
                                }, 0)}
                            </div>
                        </div>
                    </div>
                    <div className="h-[10%] flex items-center">
                        <button form="carrito" className="bg-purple-500 hover:bg-purple-700 text-white rounded-lg p-2 w-full" >Pagar</button>
                    </div>
                </div>
            </div>
            <div className={`w-full shadow-lg shadow-gray-600 md:hidden h-dvh ${height} bg-purple-200 ml-auto fixed duration-500  `}>
                <div className="p-5 h-inherit">
                    <div className="w-full flex justify-center items-center mb-5">
                        <div className="text-2xl flex items-center font-bold justify-center">
                            <Icon icon="mdi:cart" />
                            Carrito
                        </div>
                        <button className={` w-7 text-2xl rounded-full border-2 text-center border-purple-600 transition-all duration-500 ${show ? "-rotate-90" : "rotate-90"} `} title="deploy" onClick={handleShow} ><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className="flex flex-col max-h-[82%] h-[82%] overflow-y-scroll custom-scrollbar mt-1">
                        <form id="carrito1" onSubmit={handleSumit}>
                            {venttall?.map((venttall, i) => {
                                if (articulo !== undefined) {
                                    return (
                                        <Carrito deleteVenttall={deleteVenttall} venttall={venttall} articulo={articulo} mayorista={mayorista} key={i} />
                                    )
                                }
                            })}
                        </form>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="text-lg">Total sin modificar:</div>
                            <div className="text-lg">
                                {venttall?.reduce((total, i) => {
                                    var articuloAct = articulo.find((art) => art.tallas.find((talla) => talla.id === i.talla));
                                    var mar = (articuloAct?.precioMayorista ?? 0) * i.cantidad;
                                    var tal = (articuloAct?.precioDetal ?? 0) * i.cantidad;
                                    if (mayorista) {
                                        return total + mar;
                                    } else {
                                        return total + tal;
                                    }
                                }, 0)}
                            </div>
                        </div>
                    </div>
                    <div className="h-[10%] flex items-center">
                        <button form="carrito1" className="bg-purple-500 hover:bg-purple-700 text-white rounded-lg p-2 w-full" >Pagar</button>
                    </div>
                </div>
            </div>
            {pago && <PagoItems articulo={articulo} venttall={venttall} setVenttall={setVenttall} closeComponent={handlePago} deploy={handlePago} key={1} />}
        </>
    )
}

export default ResumenCompra;

interface CarritoProps {
    venttall: Venttall;
    articulo: Articulo[];
    mayorista: boolean;
    deleteVenttall: (id: number) => void;
}

const Carrito: FC<CarritoProps> = ({ articulo, mayorista, venttall, deleteVenttall }) => {

    const articuloAct = articulo.find((art) => art.tallas.find((talla) => talla.id === venttall.talla));
    const talla = articuloAct?.tallas.find((talla) => talla.id === venttall.talla);

    const [precio, setPrecio] = useState<number>(0);

    // Set the price of the article
    useEffect(() => {
        var mar = (articuloAct?.precioMayorista ?? 0) * venttall.cantidad;
        var tal = (articuloAct?.precioDetal ?? 0) * venttall.cantidad;
        if (precio === 0) {
            if (mayorista) {
                setPrecio(mar);
            } else {
                setPrecio(tal);
            }
        } else {
            if (mar === precio || tal === precio) {
                if (mayorista) {
                    setPrecio(mar);
                } else {
                    setPrecio(tal);
                }
            }
        }
    }, [mayorista]);

    useEffect(() => {
        var mar = (articuloAct?.precioMayorista ?? 0) * venttall.cantidad;
        var tal = (articuloAct?.precioDetal ?? 0) * venttall.cantidad;
        if (mayorista) {
            setPrecio(mar);
        } else {
            setPrecio(tal);
        }
    }, [venttall]);

    const handlePrecio = (e: ChangeEvent<HTMLInputElement>) => {
        setPrecio(Number(e.target.value));
    }

    return (
        <>
            <div className="relative flex flex-row p-2 rounded-xl shadow-lg mb-2 bg-purple-300" key={articuloAct?.id}>
                <div className="w-1/3 h-inherit flex items-center p-1">
                    <div className="rounded-xl overflow-hidden mb-2 shadow-2xl h-min" >
                        <img src="/modarly.jpeg" alt="user" className="object-cover" width="" />
                    </div>
                </div>
                <div className="w-2/3 flex flex-col">
                    <div className="text-lg">{articuloAct?.nombre}</div>
                    <div className="md:text-sm md:flex">
                        <p className="flex items-center">Precio:</p>
                        <div className="flex w-full justify-center">
                            <input name={`${venttall.talla}`} type="number" value={precio} className="md:w-full w-[80%] ml-2 p-1 rounded-lg bg-purple-400 shadow-lg" onChange={(e) => handlePrecio(e)} />
                        </div>
                    </div>
                    <div className="md:text-sm">Talla: {talla?.talla}</div>
                    <div className="md:text-sm">Cantidad: {venttall.cantidad}</div>
                    <div className="flex justify-end relative">
                        <button className="float-right justify-center flex items-center bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => deleteVenttall(venttall.talla)}>
                            <Icon icon="material-symbols:delete-outline" />
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}