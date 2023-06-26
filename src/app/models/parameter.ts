export interface Parameter {
    id: string;
    name: string;
    value: string;
    isActive: boolean;
    activationDate: Date | string;
    expirationDate: Date | string | null;
}