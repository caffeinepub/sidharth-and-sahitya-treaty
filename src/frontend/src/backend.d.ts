import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Note {
    id: string;
    title: string;
    date: string;
    description: string;
    author: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addNote(date: string, title: string, description: string, author: string): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearSignatures(): Promise<void>;
    deleteNote(id: string): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getNotes(): Promise<Array<Note>>;
    getSignatures(): Promise<Array<[string, string]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    signTreaty(person: string, signedDate: string): Promise<boolean>;
}
