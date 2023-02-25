import Algorithm from "./Algorithm"

export default interface Question {
    algorithm: Algorithm
    text: string,
    answer: string,
    maxPoints: number
};