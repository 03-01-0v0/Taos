import {Request, Response} from 'express';

const ALLOW_CORS = process.env.ALLOW_CORS;

export class BaseController {
    protected addCorsHeaders(res: Response, allowCors: string = ALLOW_CORS): void {
        // res.setHeader(
        //     'access-control-allow-headers',
        //     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        // );
        // res.setHeader('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.setHeader('access-control-allow-origin', allowCors);
    }

    /**
     * Turns any exception into a HTTP response (and logs the error)
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected errorToResponse(e: any, res: Response): void {
        if (e && e.message) {
            let url = e?.config?.url;
            if (url !== undefined) {
                url = ' for URL: ' + url;
            } else {
                url = '';
            }
            console.error('ERROR: ' + e.message + url);
        } else if (typeof e === 'string') {
            console.error(e);
        }
        if (e.stack) {
            console.error(e.stack);
        }
        if (e.response) {
            this.addCorsHeaders(res);
            console.log(e.response);
            res.status(e.response.status).end(
                'An error occurred: ' +
                    e.response.status +
                    ' ' +
                    (e.response.data && e.response.data.message
                        ? e.response.data.message
                        : e.response.statusText)
            );
        } else if (e.message) {
            this.addCorsHeaders(res);
            res.status(417).end(
                JSON.stringify({
                    success: false,
                    message: e.message,
                    id: -1,
                })
            );
        } else {
            this.addCorsHeaders(res);
            res.status(500).end('Internal Server Error');
        }
    }
}
