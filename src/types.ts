export interface Message {
    id: string
    channel_id: string
    user_name: string
    created_at: string
    text: string
}

export interface Channel {
    id: string
    name: string
}

export interface PostgresSubUpdate<T> {
    errors?: Error[]
    new: T
    old: T
}
