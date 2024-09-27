import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Ventas = () => {
    const [deploy, setDeploy] = useState(false);

    const handleDeploy = () => {
        setDeploy(!deploy);
    }

    return (
        <>
            <div className="min-w-56 shadow-lg shadow-gray-600 max-md:hidden max-h-dvh overflow-y-scroll custom-scrollbar bg-purple-200">
                <div className="flex flex-col py-5 justify-center w-full items-center h-dvh">
                    <div>
                        <Link className="flex items-center " href="/ventas" >
                            <Icon className={`text-black mr-2 float-left text-5xl`} icon="material-symbols:today" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Hoy</h1>
                        </Link>
                    </div>
                    <div className="h-[5%]" />
                    <div>
                        <Link className="flex items-center " href="/ventas/semana" >
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="mdi:calendar-week" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Semana</h1>
                        </Link>
                    </div>
                    <div className="h-[5%]" />
                    <div>
                        <Link className="flex items-center " href="/ventas/mes" >
                            <Icon className={`text-black mr-2 float-left text-5xl duration-1000 `} icon="material-symbols:calendar-month" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Mes</h1>
                        </Link>
                    </div>
                    <div className="h-[5%]" />
                    <div>
                        <Link className="flex items-center " href="/ventas/anio">
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="fluent-mdl2:calendar-year" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Año</h1>
                        </Link>
                    </div>
                    <div className="h-[5%]" />
                    <div>
                        <Link className="flex items-center " href="/ventas/rango">
                            <Icon className={`text-black mr-2 float-left text-5xl  `} icon="mdi:calendar-edit" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Rango</h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`w-full shadow-lg shadow-gray-600 md:hidden duration-500 ${deploy ? "h-48" : "h-24"} overflow-y-scroll custom-scrollbar bg-purple-200`}>
                <div className="flex w-full justify-between px-10 pt-6 pb-6">
                    <h1 className="text-center text-2xl font-bold">Categorias</h1>
                    <button className={` w-8 text-2xl rounded-full border-2 text-center border-purple-600 duration-500 ${deploy ? "-rotate-90" : ""} `} title="deploy" onClick={() => setDeploy(!deploy)}><Icon icon="material-symbols:arrow-back-ios-new" /></button>
                </div>
                <div className={`w-full flex-col ${deploy ? "" : "hidden"} px-10`}>
                    <div className="flex justify-between">
                        <Link className="flex items-center " href="/ventas" onClick={handleDeploy} >
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="material-symbols:today" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Hoy</h1>
                        </Link>
                        <Link className="flex items-center " href="/ventas/semana" onClick={handleDeploy} >
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="mdi:calendar-week" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Semana</h1>
                        </Link>
                    </div>
                    <div className="h-[5%]" />
                    <div className="flex justify-between">
                        <Link className="flex items-center " href="/ventas/mes" onClick={handleDeploy} >
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="material-symbols:calendar-month" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Mes</h1>
                        </Link>
                        <Link className="flex items-center " href="/ventas/anio" onClick={handleDeploy} >
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="fluent-mdl2:calendar-year" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Año</h1>
                        </Link>
                    </div>
                    <div className="h-[5%]" />
                    <div className="w-full justify-center items-center flex mb-5">
                        <Link className="flex items-center " href="/ventas/rango" onClick={handleDeploy} >
                            <Icon className={`text-black mr-2 float-left text-5xl `} icon="mdi:calendar-edit" />
                            <h1 className={`text-black font-medium origin-left text-3xl `}>Rango</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ventas;