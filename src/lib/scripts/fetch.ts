export async function Get(url: string) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let data;
    try {
        data = await respose.json();
    } catch (error) {
        console.error(error);
        data = { error: "Error al cargar los datos" };
    }
    return { data, status: respose.status };
}

export async function Post(url: string, dataIn: object) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataIn)
    });
    let data;
    try {
        data = await respose.json();
    } catch (error) {
        console.error(error);
        data = { error: "Error al enviar los datos" };
    }
    return { data, status: respose.status };
}

export async function Put(url: string, dataIn: object) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataIn)
    });
    let data;
    try {
        data = await respose.json();
    } catch (error) {
        console.error(error);
        data = { error: "Error al enviar los datos" };
    }
    return { data, status: respose.status };
}

export async function Delete(url: string, dataIn?: object) {
    const options: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (dataIn) {
        options.body = JSON.stringify(dataIn);
    }

    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, options);
    let data;
    try {
        data = await respose.json();
    } catch (error) {
        console.error(error);
        data = { error: "Error al eliminar los datos" };
    }
    return { data, status: respose.status };
}