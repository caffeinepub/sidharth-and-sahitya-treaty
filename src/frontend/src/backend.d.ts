export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Note {
    id: string;
    title: string;
    date: string;
    description: string;
    author: string;
}
export interface backendInterface {
    addNote(date: string, title: string, description: string, author: string): Promise<string>;
    clearSignatures(): Promise<void>;
    deleteNote(id: string): Promise<boolean>;
    getDailySignatures(): Promise<Array<[string, string]>>;
    getNotes(): Promise<Array<Note>>;
    getSignatures(): Promise<Array<[string, string]>>;
    getTreatyText(): Promise<Array<string>>;
    saveTreatyText(clauses: Array<string>): Promise<boolean>;
    signDaily(person: string, date: string, displayDate: string): Promise<boolean>;
    signTreaty(person: string, signedDate: string): Promise<boolean>;
}
