import Swal from "sweetalert2";
import { Venta } from "../types/types";
import { Get } from "./fetch";

export const printFactura = async (id: number) => {
    try {
        const {data} = await Get(`/api/venta/find/${id}`);
        printventa(data);
    } catch (error) {
        console.error(error);
    }
}

const printventa = async (venta: Venta) => {
    try {
        const res = await fetch(`/api/print`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                invoiceNumber: venta.id,
                date: new Date().toISOString().split('T')[0],
                customer: venta.cliente.nombres + " " + venta.cliente.apellidos,
                customerId: venta.cliente.cedula,
                paymentMethod: venta.metodoDePago,
                pagacon: venta.pagacon,
                vueltos: venta.vueltos,
                products: venta.venttall?.map((v) => ({
                    name: v.talla.articulo.nombre,
                    talla: v.talla.talla,
                    quantity: v.cantidad,
                    price: v.precioFinal
                })),
                total: venta.venttall?.reduce((acc, v) => acc + v.precioFinal, 0)
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
        console.error(error);
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