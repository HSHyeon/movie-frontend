export type ReviewType = {
    id: string;
    writerId: string;
    nickname: string;
    score: number;
    content: string;
}

export type ReviewInputType = {
    movieId: number;
    score: number;
    content: string;
}
