import ProblemType from "../enums/ProblemType";

export default interface Algorithm {
    problemType: ProblemType,
    code: string,
    algorithmSteps: any[],
    algorithmParameters: any,
    componentRoute: string
};