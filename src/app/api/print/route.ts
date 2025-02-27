import { NextResponse, NextRequest } from 'next/server';
import { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } from 'node-thermal-printer';

interface factura {
    invoiceNumber: number,
    customer: string,
    customerId: string,
    date: string,
    products: any[],
    total: number,
    paymentMethod: string,
    pagacon: number,
    vueltos: number
    articulos: Articulo[]
}

interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    categorias: Array<unknown>;
    tallas: Array<unknown>;
}

export async function POST(req: NextRequest) {
    try {
        // Configurar la impresora
        const printer = new ThermalPrinter({
            type: PrinterTypes.EPSON, // 'star' or 'epson'
            interface: '/dev/usb/lp0',
            options: {
                timeout: 1000,
            },
            width: 48, // Number of characters in one line - default: 48
            characterSet: CharacterSet.SLOVENIA, // Character set - default: SLOVENIA
            breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
            removeSpecialCharacters: false, // Removes special characters - default: false
            lineCharacter: '-', // Use custom character for drawing lines - default: -
            driver: 'XP-80',
        });

        // Body de la impresion
        const body: factura = await req.json();
        const products = body.products;
        const articulos = body.articulos;

        // Conectar a la impresora
        const isConnected = await printer.isPrinterConnected();
        console.log('Printer connected:', isConnected);

        // Cabecera de la impresion
        printer.alignCenter();
        await printer.printImage('./public/modarly.png');
        printer.println('Modarly');
        printer.println('Calle 43 #22-40');
        printer.println('');
        printer.alignLeft();

        // Cuerpo de la impresion

        printer.print('Factura de venta #: ');
        printer.bold(true);
        printer.println(body.invoiceNumber.toString());
        printer.bold(false);
        printer.println('');
        printer.println('Cliente: ' + body.customer);
        printer.println('Cedula: ' + body.customerId);
        printer.println('Fecha: ' + body.date);

        // Imprimir productos

        printer.drawLine();
        printer.tableCustom([
            { text: 'Producto', align: 'LEFT', width: 0.4 },
            { text: 'Cant.', align: 'CENTER', width: 0.2 },
            { text: 'Precio', align: 'RIGHT', width: 0.3 }
        ]);
        printer.drawLine();

        products.forEach((product: any) => {
            const name = articulos.find((articulo: Articulo) => articulo.id === product.idArticulo)?.nombre;
            printer.tableCustom([
                { text: name + " " + product.talla, align: 'LEFT', width: 0.4 },
                { text: product.quantity.toString(), align: 'CENTER', width: 0.2 },
                { text: product.price.toFixed(2), align: 'RIGHT', width: 0.3 }
            ]);
            printer.println('');
        });
        printer.drawLine();

        printer.alignRight();
        printer.println('Total: ' + body.total);
        printer.println('Método de pago: ' + body.paymentMethod);
        printer.println('Efectivo: ' + body.pagacon);
        printer.println('Cambio: ' + body.vueltos);

        printer.println('');
        printer.println('');
        printer.alignCenter();

        const codigo = "" + body.invoiceNumber.toString();

        printer.code128(codigo);
        printer.println('Gracias por su compra!');
        printer.cut();

        printer.beep();

        // Imprimir
        await printer.execute();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error al imprimir:', error);
        return NextResponse.json({ success: false, error: 'Error al imprimir' }, { status: 500 });
    }
}