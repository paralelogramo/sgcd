export interface Student {
    name: string;
    dni: string;
    uni_id: string;
    email: string;
    emailextra: string | null;
    state: string;
    scholarship: string;
    advisor: string;
    coadvisor: string | null;
    year: number;
    courses: any;
}