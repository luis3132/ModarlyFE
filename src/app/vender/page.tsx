import ResumenCompra from "@/components/sidecomponents/resumenCompra";
import Vender from "@/components/sidecomponents/vender";


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