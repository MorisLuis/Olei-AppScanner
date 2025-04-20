import * as Sentry from '@sentry/react-native';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { CustomAxiosRequestConfig } from '../api/responseInterceptors';

const initSentry = () : void => {
    Sentry.init({
        dsn: 'https://c539a128cf67337c4cd9f090fa9f29f5@o4509170011406336.ingest.us.sentry.io/4509170012192768',
        tracesSampleRate: 1.0,
        enableNative: true,
        //debug: true,
        sendDefaultPii: true,

        beforeSend(event) {
            // Limpieza segura de headers sensibles
            if (event.request?.headers?.authorization) {
                delete event.request.headers.authorization;
            }

            // También puedes hacer limpieza de otras cosas si quieres
            // delete event.request?.cookies;

            return event;
        },
    });
};


const trackApiRequest = (config: InternalAxiosRequestConfig) : void => {
    const { method, url, data, params } = config;

    Sentry.addBreadcrumb({
        category: 'api.request',
        message: `[${method?.toUpperCase()}] ${url}`,
        level: 'info',
        data: {
            params,
            body: data,
        },
    });
};

const trackApiResponse = (error: AxiosError) : void => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error.response?.status;

    Sentry.withScope(scope => {
        scope.setTag('module', 'axios-interceptor');
        scope.setExtra('url', originalRequest.url ?? '');
        scope.setExtra('status', status ?? 'unknown');
        scope.setExtra('responseData', error.response?.data ?? {});
        scope.setExtra('headers', originalRequest.headers);

        const customError = new Error(`[${status}] ${error.message} - ${originalRequest.url}`);
        customError.name = 'AxiosInterceptorError';

        Sentry.captureException(customError);
    });
}



export {
    initSentry,
    trackApiRequest,
    trackApiResponse
}