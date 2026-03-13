type RequestOptions = {
    baseUrl: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    endpoint: string;
    data?: any;
    params?: Record<string, string>;
    token?: string;
    headers?: Record<string, string>;
};

export async function apiFetch({
    baseUrl,
    method = 'GET',
    endpoint,
    data,
    params,
    token,
    headers = {},
}: RequestOptions) {
    const queryString = params
        ? '?' + new URLSearchParams(params).toString()
        : '';

    const response = await fetch(`${baseUrl}${endpoint}${queryString}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Something went wrong');
    }

    return response.json();
}
