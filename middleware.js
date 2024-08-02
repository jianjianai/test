export async function onRequest(context){
    const { request, env } = context;
    return new Response("hello world");
}

export const config = {
    matcher: ['/:path*'],
  };