export async function patchRequest(url: string, form: object) {
    const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    return responseHandler(response);
}

export async function getRequest(url: string) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
    });

    return responseHandler(response);
}

async function responseHandler(response: Response) {
    if (response.status !== 200) {
        throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson;
}
