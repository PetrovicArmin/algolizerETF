import Question from "./Question";

export default interface QuizInformation {
    questions: Question[],
    currentQuestionIndex: number,
    maxPoints: number,
    currentPoints: number
};