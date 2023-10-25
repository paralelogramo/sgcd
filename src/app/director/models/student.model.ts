export interface Student {
    name: string;
    dni: string;
    uni_id: number;
    email: string;
    emailextra: string | null;
    state: string;
    scholarship: string;
    scholarship_state: string;
    advisor: string;
    coadvisor: string | null;
    year: number;
    courses: any;
    notes: any;
}