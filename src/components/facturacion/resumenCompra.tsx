import { Icon } from "@iconify/react/dist/iconify.js"
import React, { FormEvent, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import Carrito from "./carrito";
import { VenttallCreate } from "@/lib/types/types";
import { CarritoContext } from "@/lib/hooks/carrito";
import PagoItems from "./pagoItems";


const ResumenCompra = () => {

    const { venta, handleAddVenttall, verCarrito, setVerCarrito, mayorista, articulos } = useContext(CarritoContext);

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
        if (venta.venttall?.length !== 0) {
            if (show) {
                setHeight("bottom-0");
            } else {
                setHeight("-bottom-[93%]");
            }
        } else {
            setHeight("-bottom-[100%]");
        }
    }, [show, venta.venttall]);

    const handleSumit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const updatedVenttallList: VenttallCreate[] = [];
        let update: boolean = false;

        Array.from(formData.entries()).forEach(([key, value]) => {
            const precio = parseInt(value as string, 10);
            const id = parseInt(key);
            const venttall = venta.venttall?.find((venttall) => venttall.talla === id);
            const cantidad = venttall?.cantidad;
            const art = articulos.find((art) => art.tallas.find((talla) => talla.id === id));
            const mar = (art?.precioMayorista ?? 0) * (cantidad ?? 0);
            const tal = (art?.precioDetal ?? 0) * (cantidad ?? 0);

            if (precio > 0) {
                const venttall: VenttallCreate = {
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
            handleAddVenttall(updatedVenttallList);
            Swal.fire({
                icon: 'success',
                title: 'Modificado los precios con exito!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setPago(true);
            });
        } else {
            handleAddVenttall(updatedVenttallList);
            setPago(true);
        }
    }

    return (
        <>
            <div className={`min-w-96 max-w-96 shadow-2xl shadow-gray-600 max-md:hidden max-h-screen bg-purple-200 ml-auto fixed top-0 h-dvh duration-500 ${verCarrito ? "right-0" : "-right-96"} `}>
                <div className="px-5 pt-11 h-inherit">
                    <div className="w-full flex justify-center items-center">
                        <div className="text-2xl flex items-center font-bold justify-center">
                            <Icon icon="mdi:cart" />
                            Carrito
                        </div>
                        <button title="close" className=" flex items-center pr-1 pt-1" onClick={() => setVerCarrito(false)}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                    </div>
                    <div className="flex flex-col max-h-[80%] h-[80%] overflow-y-scroll custom-scrollbar mt-1">
                        <form id="carrito" onSubmit={handleSumit}>
                            {venta.venttall?.map((venttall, i) => {
                                if (articulos !== undefined) {
                                    return (
                                        <Carrito venttall={venttall} key={i} />
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
                                {venta.venttall?.reduce((total, i) => {
                                    const articuloAct = articulos.find((art) => art.tallas.find((talla) => talla.id === i.talla));
                                    const mar = (articuloAct?.precioMayorista ?? 0) * i.cantidad;
                                    const tal = (articuloAct?.precioDetal ?? 0) * i.cantidad;
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
                    <div className="w-full flex justify-center items-center mArticulob-5">
                        <div className="text-2xl flex items-center font-bold justify-center">
                            <Icon icon="mdi:cart" />
                            Carrito
                        </div>
                        <button className={` w-7 text-2xl rounded-full border-2 text-center border-purple-600 transition-all duration-500 ${show ? "-rotate-90" : "rotate-90"} `} title="deploy" onClick={handleShow} ><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                    </div>
                    <div className="flex flex-col max-h-[82%] h-[82%] overflow-y-scroll custom-scrollbar mt-1">
                        <form id="carrito1" onSubmit={handleSumit}>
                            {venta.venttall?.map((venttall, i) => {
                                if (articulos !== undefined) {
                                    return (
                                        <Carrito venttall={venttall} key={i} />
                                    )
                                }
                            })}
                        </form>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="text-lg">Total sin modificar:</div>
                            <div className="text-lg">
                                {venta.venttall?.reduce((total, i) => {
                                    const articuloAct = articulos.find((art) => art.tallas.find((talla) => talla.id === i.talla));
                                    const mar = (articuloAct?.precioMayorista ?? 0) * i.cantidad;
                                    const tal = (articuloAct?.precioDetal ?? 0) * i.cantidad;
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
            {pago && <PagoItems closeComponent={handlePago} key={1} />}
        </>
    )
}

export default ResumenCompra;

