import { ApplicationLogger } from "../services/logger";
export interface ExpressRequestCtx {
    /**
     * express logger contains information about request
     */
    logger: ApplicationLogger;
    /**
     * email of the user
     */
    email: string | null;
}
