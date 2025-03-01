"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const closeSideBar = () => {
        setIsOpen(false);
    };

    const openCloseSideBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={`h-dvh bg-purple-900 ${isOpen ? "min-w-72" : "min-w-28"} duration-500 relative max-md:hidden`}>
                <Icon className={`bg-white text-purple-950 text-6xl rounded-full absolute -right-7 top-9 border-2 border-purple-900 cursor-pointer ${!isOpen && "rotate-180"} duration-500 `} onClick={openCloseSideBar} icon="mingcute:arrow-left-fill" />
                <div className="flex flex-col py-5 justify-around w-full items-center h-dvh ">
                    <div>
                        <Link className="flex items-center " href="/" onClick={closeSideBar}>
                            <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="f7:house-fill" />
                            <h1 className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Inicio</h1>
                        </Link>
                    </div>
                    <div>
                        <div>
                            <Link className="flex items-center " href="/facturacion" onClick={closeSideBar}>
                                <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="material-symbols:sell-outline" />
                                <h1 className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Facturacion</h1>
                            </Link>
                        </div>
                        <div className="h-10" />
                        <div>
                            <Link className="flex items-center " href="/ventas" onClick={closeSideBar}>
                                <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="mdi:clipboard-text-history-outline" />
                                <div className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Ventas</div>
                            </Link>
                        </div>
                        <div className="h-10" />
                        <div>
                            <Link className="flex items-center " href="/inventario" onClick={closeSideBar}>
                                <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="fluent:box-search-16-regular" />
                                <h1 className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Inventario</h1>
                            </Link>
                        </div>
                        <div className="h-10" />
                        <div>
                            <Link className="flex items-center " href="/categorias" onClick={closeSideBar}>
                                <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="tabler:category" />
                                <h1 className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Categorias</h1>
                            </Link>
                        </div>
                        <div className="h-10" />
                        <div>
                            <Link className="flex items-center " href="/clientes" onClick={closeSideBar}>
                                <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="gravity-ui:persons" />
                                <h1 className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Clientes</h1>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link className="flex items-center " href="/config" onClick={closeSideBar}>
                            <Icon className={`text-white mr-2 float-left text-5xl duration-1000 ${!isOpen && "rotate-[360deg] "} `} icon="mdi-light:settings" />
                            <h1 className={`text-white font-medium origin-left text-3xl duration-500 ${!isOpen && "hidden"} `}>Configuracion</h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`w-full flex items-center justify-center max-h-20 min-h-14 bg-purple-900 md:hidden`}>
                <div>
                    <Link className="flex items-center " href="/">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="f7:house-fill" />
                    </Link>
                </div>
                <div>
                    <Link className="flex items-center " href="/facturacion">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="material-symbols:sell-outline" />
                    </Link>
                </div>
                <div>
                    <Link className="flex items-center " href="/ventas">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="mdi:clipboard-text-history-outline" />
                    </Link>
                </div>
                <div>
                    <Link className="flex items-center " href="/inventario">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="fluent:box-search-16-regular" />
                    </Link>
                </div>
                <div>
                    <Link className="flex items-center " href="/categorias">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="tabler:category" />
                    </Link>
                </div>
                <div>
                    <Link className="flex items-center " href="/clientes">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="gravity-ui:persons" />
                    </Link>
                </div>
                <div>
                    <Link className="flex items-center " href="/config">
                        <Icon className={`text-white mr-3 float-left text-4xl `} icon="mdi-light:settings" />
                    </Link>
                </div>
            </div>
        </>
    );
}