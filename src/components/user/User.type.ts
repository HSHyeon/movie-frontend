export interface UserType {
     username: string; password: string; nickname?: string ;
}

export const Role = {
    admin: "ROLE_ADMIN", user: "ROLE_USER", critic: "ROLE_CRITIC",
}