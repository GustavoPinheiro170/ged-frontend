export enum EnvType {
    local =  'local',
    production = 'production'
}
export type HostConfig = Readonly<{ 
    [Key in EnvType]: string
}>;