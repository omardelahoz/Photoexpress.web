export interface Event {
    id: string;
    additionalValue: number;
    baseValue: number;
    institutionAddress: string;
    institutionName: string;
    startTime: Date | string;
    numStudents: number;
    isActive: boolean;
    activationDate: Date | string; 
    expirationDate: Date | string| null;
}