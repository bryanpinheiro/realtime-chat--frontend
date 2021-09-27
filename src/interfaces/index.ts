export type Message = {
    text: string,
    author: string,
    to: string,
    createdAt?: Date
}

export type User = {
    id: string,
    name: string,
    isOnline?: boolean,
    contactList: []
}