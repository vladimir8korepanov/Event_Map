export interface Event {
    id: string
    title: string
    description: string
    date: string //ISO строка 
    location: {
        lat: number
        lng: number
    }
    isFavorite: boolean,
    image: string
}