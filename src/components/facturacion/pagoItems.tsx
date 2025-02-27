import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Items from './items';

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

interface Venta {
    fecha: string;
    cliente: string;
    pagacon: number | "";
    vueltos: number;
    metodoDePago: string;
}

interface VentaCreada {
    id: number;
    fecha: Date;
    cliente: string;
    pagacon: number;
    vueltos: number;
    metodoDePago: string;
}

interface Cliente {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    fijo: string;
    descripcion: string;
    mayorista: boolean;
    fechaCreacion: string;
}

interface PagoItemsProps {
    closeComponent: () => void;
    venttall: Venttall[] | null;
    articulo: Articulo[];
    setVenttall: (venttall: Venttall[]) => void;
    deploy: () => void;
}

const PagoItems: FC<PagoItemsProps> = ({ closeComponent, venttall, articulo, setVenttall, deploy }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState("");
    const [anadir, setAnadir] = useState(false);
    const [clienteNuevo, setClienteNuevo] = useState(false);
    const total = venttall?.reduce((total, i) => {
        return total + (i?.precioFinal || 0);
    }, 0);
    const [efectivo, setEfectivo] = useState(false);
    const [clienteExitente, setClienteExistente] = useState(false);
    const [reload, setReload] = useState(false);

    const [VentaCreada, setVentaCreada] = useState<VentaCreada | null>(null);
    const [clienteCreado, setClienteCreado] = useState<Cliente | null>(null);
    const [venttallCreada, setVenttallCreada] = useState<Venttall[] | null>(null);
    const [tallaActualizada, setTallaActualizada] = useState<Talla[] | null>(null);
    const tallasActualizar: Talla[] = articulo?.flatMap((art) => art.tallas.map((talla) => {
        const venttallAct = venttall?.find((venttall) => venttall.talla === talla.id);
        if (venttallAct) {
            return {
                id: talla.id,
                articulo: talla.articulo,
                talla: talla.talla,
                cantidad: talla.cantidad - (venttallAct?.cantidad || 0)
            }
        }
    })).filter((talla): talla is Talla => talla !== undefined);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const hoy = new Date(); const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();

    const [cliente, setCliente] = useState<Cliente>({
        cedula: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        fijo: "",
        descripcion: "",
        mayorista: false,
        fechaCreacion: fecha
    });

    const [venta, setVenta] = useState<Venta>({
        fecha: fecha + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds(),
        cliente: "",
        pagacon: 0,
        vueltos: 0,
        metodoDePago: ""
    });

    // function to list the clientes
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cliente/list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                setClientes(data);
                setLoading(false);
            } catch (e) {
                setError("Error al cargar los clientes");
                setLoading(false);
            }
        }
        fetchClientes();
    }, [reload]);
    // function to show buttom to create a new client
    useEffect(() => {
        if (!clienteNuevo) {
            if (cliente?.nombres && cliente?.apellidos && cliente?.cedula && cliente?.telefono && cliente?.descripcion) {
                setAnadir(false);
                setVenta({
                    ...venta,
                    cliente: cliente?.cedula
                });
            } else {
                if (cliente?.nombres && cliente?.apellidos && cliente?.cedula) {
                    setAnadir(true);
                    setVenta({
                        ...venta,
                        cliente: ""
                    });
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cliente]);
    // function to calculate the vueltos
    useEffect(() => {
        if (venta.metodoDePago === "Efectivo") {
            setEfectivo(true);
            if (Number(venta.pagacon) - (total ?? 0) >= 0) {
                setVenta({
                    ...venta,
                    vueltos: Number(venta.pagacon) - (total ?? 0)
                });
            }
        } else {
            setEfectivo(false);
            setVenta({
                ...venta,
                vueltos: 0
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venta.pagacon, venta.metodoDePago]);

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const filterCliente = clientes.filter((c) =>
        (cliente?.cedula && c.cedula.toString().includes(cliente?.cedula)) ||
        (cliente?.nombres && c.nombres.toLowerCase().includes(cliente?.nombres.toLowerCase())) ||
        (cliente?.apellidos && c.apellidos.toLowerCase().includes(cliente?.apellidos.toLowerCase()))
    );

    const handleCliente = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const cedula = clientes.find((cliente) => cliente.cedula === e.target.value);
        const nombre = clientes.find((cliente) => cliente.nombres === e.target.value || cliente.apellidos === e.target.value);

        if (!clienteNuevo) {
            if (cedula || nombre) {
                setCliente(cedula || nombre || {
                    cedula: "",
                    nombres: "",
                    apellidos: "",
                    telefono: "",
                    fijo: "",
                    descripcion: "",
                    mayorista: false,
                    fechaCreacion: fecha
                });
                setClienteExistente(true);
            } else {
                setClienteExistente(false);
                if (e.target.name === "cedula") {
                    setCliente({
                        ...cliente,
                        cedula: e.target.value,
                        nombres: cliente?.nombres || "",
                        apellidos: cliente?.apellidos || "",
                        telefono: "",
                        fijo: "",
                        descripcion: "",
                        mayorista: cliente?.mayorista || false,
                        fechaCreacion: fecha
                    });
                }
                if (e.target.name === "nombre") {
                    setCliente({
                        ...cliente,
                        cedula: cliente?.cedula || "",
                        nombres: e.target.value,
                        apellidos: cliente?.apellidos || "",
                        telefono: "",
                        fijo: "",
                        descripcion: "",
                        mayorista: cliente?.mayorista || false,
                        fechaCreacion: fecha
                    });
                }
                if (e.target.name === "apellido") {
                    setCliente({
                        ...cliente,
                        cedula: cliente?.cedula || "",
                        nombres: cliente?.nombres || "",
                        apellidos: e.target.value,
                        telefono: "",
                        fijo: "",
                        descripcion: "",
                        mayorista: cliente?.mayorista || false,
                        fechaCreacion: fecha
                    });
                }
            }
        } else {
            setCliente({
                ...cliente,
                [e.target.name]: e.target.value
            });
            if (e.target.name === "mayorista") {
                setCliente({
                    ...cliente, [e.target.name]: (e.target as HTMLInputElement).checked
                });
            }
        }
    }

    const handleShowClienteNuevo = () => {
        setAnadir(!anadir);
        setClienteNuevo(!clienteNuevo);
    }

    const handleVenta = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (e.target.name === "cedula") {
            setVenta({
                ...venta,
                cliente: e.target.value
            });
        } else {
            setVenta({
                ...venta,
                [e.target.name]: e.target.value
            });
        }
    }

    // function to create a new client
    const handleAnadirCliente = () => {
        if (cliente.cedula === "" || cliente.nombres === "" || cliente.apellidos === "" || cliente.descripcion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene descripcion!',
            });
        } else {
            Swal.fire({
                title: 'Guardar Cliente',
                text: '¿Estas seguro de guardar este cliente?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    setReload(!reload);
                    setClienteNuevo(false);
                    setAnadir(false);
                    setLoading(true);
                    saveClient();
                }
            });
        }
    }
    const saveClient = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/cliente/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });
            const data = await res.json();
            setClienteCreado(data);
            setLoading(false);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al guardar el cliente',
            });
        }
    }

    // function to create a new sale
    const handleVentaNueva = () => {
        if (clienteExitente || clienteCreado) {
            if (venta.cliente === "" || venta.metodoDePago === "" || (venta.metodoDePago === "Efectivo" && (venta.pagacon === 0 || venta.vueltos === 0))) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor llene todos los campos!',
                });
            } else {
                Swal.fire({
                    title: 'Guardar Venta',
                    text: '¿Estas seguro de guardar esta venta?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setUpdate(true);
                        setLoading(true);
                        saveVenta();
                    }
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor llene todos los campos!',
            });
        }
    }
    const saveVenta = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/venta/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(venta)
            });
            const data = await res.json();
            setVentaCreada(data);
            setLoading(false);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al guardar la venta',
            });
        }
    }
    // function to update the venttall, setting the venta id
    useEffect(() => {
        if (VentaCreada) {
            const newVenttall = venttall?.map((v) => ({
                ...v,
                venta: VentaCreada.id
            })) || [];
            setVenttall(newVenttall);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VentaCreada]);
    // function to update the tallas, decreasing the quantity
    useEffect(() => {
        if (VentaCreada) {
            updateTallas();
            saveVenttall();
            setUpdate(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venttall]);
    
    useEffect(() => {
        if (venttallCreada && tallaActualizada) {
            deploy();
            Swal.fire({
                icon: 'success',
                title: 'Venta guardada',
                text: 'Venta guardada con exito!, desea imprimir la factura?',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                deploy();
                if (result.isConfirmed) {
                    printFactura();
                } else {
                    location.reload();
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venttallCreada, tallaActualizada]);

    const saveVenttall = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/venttall/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(venttall)
            });
            const data = await res.json();
            setVenttallCreada(data);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al guardar los items',
            });
        }
    }

    const printFactura = async () => {
        try {
            const res = await fetch(`/api/print`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        invoiceNumber: VentaCreada?.id,
                        date: VentaCreada?.fecha,
                        customer: cliente?.nombres + " " + cliente?.apellidos,
                        customerId: cliente?.cedula,
                        articulos: articulo,
                        paymentMethod: venta.metodoDePago,
                        pagacon: venta.pagacon,
                        vueltos: venta.vueltos,
                        products: venttall?.map((v) => ({
                            idArticulo: tallasActualizar.find((t) => t.id === v.talla)?.articulo,
                            talla: tallasActualizar.find((t) => t.id === v.talla)?.talla,
                            quantity: v.cantidad,
                            price: v.precioFinal
                        })),
                        total: total
                })
            });
            const data = await res.json();
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Factura impresa',
                    text: 'Factura impresa con exito!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    } else {
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al imprimir la factura',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    } else {
                        location.reload();
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al imprimir la factura',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                } else {
                    location.reload();
                }
            });
        }
    }

    const updateTallas = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/talla/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tallasActualizar)
            });
            const data = await res.json();
            setTallaActualizada(data);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al actualizar las tallas',
            });
        }
    }

    return (
        <>
            <div className="w-full h-dvh fixed inset-0 flex items-center justify-center backdrop-blur-sm z-0">
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
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[60%] max-md:w-[80%] bg-white rounded-lg pb-2 `}>
                                        <button title="close" className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10 font-bold" >Pago items</div>
                                        <div className="relative w-full h-min md:flex max-md:pl-3">
                                            <div className="md:w-1/3 max-md:w-full max-h-[80%] pl-4">
                                                <div className="text-2xl font-bold" >Items</div>
                                                <div className='h-min max-h-48 overflow-y-scroll custom-scrollbar'>
                                                    {venttall?.map((v) => (
                                                        <Items articulo={articulo} venttall={v} key={v.talla} />
                                                    ))}
                                                </div>
                                                <div className="w-full justify-between flex py-5">
                                                    <p>Total:</p>
                                                    <p>{total}</p>
                                                </div>
                                            </div>
                                            <div className="md:w-2/3 max-md:w-full px-5 bg-slate-100 rounded-lg md:ml-2 mb-2">
                                                <div className="text-2xl font-bold " >Cliente</div>
                                                <div className="w-full flex max-md:flex-col">
                                                    <div className="w-1/3 max-md:w-full flex flex-col px-2 justify-center">
                                                        <p className='w-full'>Cedula</p>
                                                        <input type='number' name="cedula" value={cliente?.cedula} onChange={(e) => { handleCliente(e); handleVenta(e); }} list='cedula' className="w-full px-2 bg-gray-200 rounded-lg" />
                                                        <datalist id="cedula">
                                                            {filterCliente?.map((cliente) => (
                                                                <option value={cliente.cedula} key={cliente.cedula} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                    <div className="w-1/3 max-md:w-full flex flex-col px-2 justify-center">
                                                        <p className='w-full'>Nombres</p>
                                                        <input name="nombre" value={cliente?.nombres} list='nombre' className="w-full px-2 bg-gray-200 rounded-lg" onChange={handleCliente} />
                                                        <datalist id='nombre'>
                                                            {filterCliente?.map((cliente) => (
                                                                <option value={cliente.nombres} key={cliente.nombres} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                    <div className="w-1/3 max-md:w-full flex flex-col px-2 justify-center">
                                                        <p className='w-full'>Apellidos</p>
                                                        <input name="apellido" value={cliente?.apellidos} list='apellido' className="w-full px-2 bg-gray-200 rounded-lg" onChange={handleCliente} />
                                                        <datalist id='apellido'>
                                                            {filterCliente?.map((cliente) => (
                                                                <option value={cliente.apellidos} key={cliente.apellidos} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className={`p-10 flex-grow h-20 justify-center flex items-center ${loading ? "" : "hidden"}`}>
                                                    <div className="spinner">
                                                        <div className="double-bounce1"></div>
                                                        <div className="double-bounce2"></div>
                                                    </div>
                                                </div>
                                                <div className={`p-10 flex flex-grow h-20 justify-center  items-center ${error ? "" : "hidden"}`}>
                                                    <div className="error text-center">
                                                        <h1 className="text-4xl text-red-500">{error}</h1>
                                                    </div>
                                                </div>
                                                <div className={`w-full flex justify-center duration-1000 ${anadir ? "h-min py-3" : "h-0"} overflow-hidden`}>
                                                    <button className="bg-purple-500 hover:bg-purple-700 text-white rounded-lg p-2 w-52 flex items-center justify-center" onClick={handleShowClienteNuevo}>
                                                        <Icon className="mr-1" icon="mdi:account-plus" />
                                                        <p>Crear Cliente</p>
                                                    </button>
                                                </div>
                                                <div className={`w-full flex flex-col duration-1000 overflow-hidden ${clienteNuevo ? "h-min py-3" : "h-0"}`}>
                                                    <div className="w-full flex justify-between">
                                                        <div className='w-1/2 p-1'>
                                                            <p>Telefono:</p>
                                                            <input name="telefono" type='number' value={cliente?.telefono} onChange={handleCliente} className="w-full p-1 rounded-lg bg-gray-200" />
                                                        </div>
                                                        <div className='w-1/2 p-1'>
                                                            <p>Fijo:</p>
                                                            <input name="fijo" type='number' value={cliente?.fijo} onChange={handleCliente} className="w-full p-1 rounded-lg bg-gray-200" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex flex-col">
                                                        <p>Descripcion:</p>
                                                        <textarea name="descripcion" value={cliente?.descripcion} onChange={handleCliente} className="w-full p-1 rounded-lg bg-gray-200" maxLength={500} />
                                                    </div>
                                                    <div className="w-full flex flex-col justify-center mb-2">
                                                        <p>Mayorista:</p>
                                                        <input className='bg-black bg-opacity-10 h-8 rounded-full text-center' type="checkbox" name="mayorista" checked={cliente?.mayorista} onChange={handleCliente} />
                                                    </div>
                                                    <div className="w-full flex justify-center">
                                                        <button className="bg-red-500 hover:bg-red-700 text-white rounded-lg p-2 w-52 flex items-center justify-center" onClick={handleShowClienteNuevo}>
                                                            <Icon className="mr-1" icon="mdi:account-minus" />
                                                            <p>Cancelar</p>
                                                        </button>
                                                        <button className="bg-green-500 hover:bg-green-700 text-white rounded-lg p-2 w-52 flex items-center justify-center" onClick={handleAnadirCliente} >
                                                            <Icon className="mr-1" icon="mdi:account-check" />
                                                            <p>Añadir</p>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col pb-2 pt-4">
                                                    <div className="flex">
                                                        <p>Metodo de pago:</p>
                                                        <select name="metodoDePago" value={venta?.metodoDePago} onChange={(e) => handleVenta(e)} className="w-full p-1 rounded-lg bg-gray-200">
                                                            <option defaultValue="">Seleccionar</option>
                                                            <option value="Efectivo">Efectivo</option>
                                                            <option value="Tarjeta">Tarjeta</option>
                                                            <option value="Transferencia">Transferencia</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={`w-full flex overflow-hidden ${efectivo ? "h-min py-2" : "h-0"}`}>
                                                    <div className="w-1/2 px-2 pb-2">
                                                        <p>Paga con:</p>
                                                        <input name="pagacon" type="number" value={venta?.pagacon} onChange={(e) => handleVenta(e)} className="w-full p-1 rounded-lg bg-gray-200" />
                                                    </div>
                                                    <div className="w-1/2 px-2">
                                                        <p>Vueltos:</p>
                                                        <input name="vueltos" type="number" value={venta?.vueltos} className="w-full p-1 rounded-lg bg-gray-200" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <button className="bg-purple-500 hover:bg-purple-700 text-white rounded-lg p-2 w-52 flex items-center justify-center" onClick={handleVentaNueva} >
                                                <Icon className="mr-1" icon="icon-park-outline:buy" />
                                                <p>Facturar</p>
                                            </button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            {update && <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-20">
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

export default PagoItems;
