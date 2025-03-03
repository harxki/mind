import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
export default async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, _loadContext) {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");
    const body = await renderToReadableStream(_jsx(ServerRouter, { context: routerContext, url: request.url }), {
        onError(error) {
            responseStatusCode = 500;
            // Log streaming rendering errors from inside the shell.  Don't log
            // errors encountered during initial shell rendering since they'll
            // reject and get logged in handleDocumentRequest.
            if (shellRendered) {
                console.error(error);
            }
        },
    });
    shellRendered = true;
    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
        await body.allReady;
    }
    responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}
