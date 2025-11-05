import { PrismaClient } from "../generated/client/index.js";

const PrismClientSingleton = () => {
    return new PrismaClient();
}

// type declaration
declare global {
    var prisma : undefined | ReturnType<typeof PrismClientSingleton>;
}

export const prisma = globalThis.prisma ?? PrismClientSingleton()
export * from "../generated/client/index.js";

if(process.env.NODE_ENV !== "production") globalThis.prisma = prisma;