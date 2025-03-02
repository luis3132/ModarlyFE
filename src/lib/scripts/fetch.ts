export async function Get(url: string) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await respose.json();
    return {data, status: respose.status};
}

export async function Post(url: string, dataIn: object) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataIn)
    });
    const data = await respose.json();
    return {data, status: respose.status};
}

export async function Put(url: string, dataIn: object) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataIn)
    });
    const data = await respose.json();
    return {data, status: respose.status};
}

export async function Delete(url: string) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return { status: respose.status};
}