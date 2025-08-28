async function handleRequest(request, method) {
    // Extract headers - handle multiple headers with same name
    const headers = {};
    for (const [key, value] of request.headers.entries()) {
        if (headers[key]) {
            // If header already exists, convert to array or append to array
            if (Array.isArray(headers[key])) {
                headers[key].push(value);
            } else {
                headers[key] = [headers[key], value];
            }
        } else {
            headers[key] = value;
        }
    }
    
    // Extract body (handle potential errors gracefully)
    let body = '';
    try {
        body = await request.text();
    } catch (error) {
        body = '';
    }
    
    const response = {
        method: method,
        headers: headers,
        body: body,
        url: request.url
    };
    
    return new Response(JSON.stringify(response, null, 2), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function GET(request) {
    return handleRequest(request, 'GET');
}

export async function POST(request) {
    return handleRequest(request, 'POST');
}

export async function PUT(request) {
    return handleRequest(request, 'PUT');
}

export async function DELETE(request) {
    return handleRequest(request, 'DELETE');
}

export async function PATCH(request) {
    return handleRequest(request, 'PATCH');
}