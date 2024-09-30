import ResumenCompra from "@/components/sidecomponents/resumenCompra";
import Vender from "@/components/sidecomponents/vender";
import React from "react";


export default function Home() {
    return (
        <>
            <div className="flex flex-grow">
                <Vender />
                <div className="">
                    vender
                </div>
                <ResumenCompra />
            </div>
        </>
    );
}