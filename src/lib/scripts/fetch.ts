export async function Get(url: string) {
    const respose = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await respose.json();
    return data;
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
    return data;
}