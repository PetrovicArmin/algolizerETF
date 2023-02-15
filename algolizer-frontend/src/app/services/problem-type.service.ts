import { Injectable } from '@angular/core';
import ProblemType from '../enums/ProblemType';

@Injectable({
  providedIn: 'root'
})
export class ProblemTypeService {

  constructor() { }

  getKeyByValue(value: string):string {
    const indexOfS = Object.values(ProblemType).indexOf(value as unknown as ProblemType);  
    const key = Object.keys(ProblemType)[indexOfS];
    return key;
  }

  getValueByKey(key: string):string {
    const index: number = Object.keys(ProblemType).indexOf(key);
    return Object.values(ProblemType)[index];
  }
}
