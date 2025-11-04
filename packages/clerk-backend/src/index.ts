import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import { CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY } from "@repo/shared-secrets/secrets"

// Fn takes existing Express app instance and enhances it be adding Clerk authentication middleware
// if u call withClerk(app) it now has clerkMiddlware
export const withClerk = (app: express.Express ) => {
    if(!CLERK_PUBLISHABLE_KEY || !CLERK_SECRET_KEY){
        throw new Error("Missing clerk keys in shared secrets")
    }
    // Inject env variables programmatically
    process.env.CLERK_PUBLISHABLE_KEY = CLERK_PUBLISHABLE_KEY;
    process.env.CLERK_SECRET_KEY = CLERK_SECRET_KEY;

    app.use(clerkMiddleware() as express.RequestHandler );

    return app;

    /*
    With this line,
    app.use(clerkMiddleware() as express.RequestHandler )

    you’re telling TypeScript explicitly:

    “Hey, don’t overthink it.
    This argument is definitely a valid Express middleware (RequestHandler).”

    So:

    The runtime behavior doesn’t change at all.

    This only affects TypeScript’s understanding of the code.

    The cast silences the overload ambiguity safely.
    */
}



