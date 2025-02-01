export type MovieType = {
    id: string;
    imageUrl: string;
    title: string;
    content: string;
    genre: string;
    releaseDate: Date;
    averageRating: number;
}
export type MovieInputType = {
    imageUrl?: string;
    title: string;
    content: string;
    genre: string;
    releaseDate: Date;
}