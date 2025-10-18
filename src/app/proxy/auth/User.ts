export interface User {
    email:string;
    role:string;
    firstName: string;
    tenantId?: string | null;
}