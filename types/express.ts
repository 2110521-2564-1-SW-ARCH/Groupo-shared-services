import {ApplicationLogger} from "../services/logger";

export interface ExpressRequestCtx<T> {
    /**
     * express logger contains information about request
     */
    logger: ApplicationLogger;

    /**
     * email of the user
     */
    email: string | null;

    body: T;
}
