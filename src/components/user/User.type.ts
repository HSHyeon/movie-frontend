export interface UserType {
    inputs: { username: string; password: string; nickname?: string };
}
export type Role = "ROLE_ADMIN" | "ROLE_USER" | "ROLE_REVIEWER"