import { Action } from "@ngrx/store";
import { GETNUMBERSREGISTERS } from "./redux.actions";
import { ReduxFunctions } from './redux.functions'


export function numbersReducer(numbers:any = ReduxFunctions.getNumbers(), action: Action) {
    
    switch (action.type) {
        case GETNUMBERSREGISTERS:
            return numbers = ReduxFunctions.getNumbers();
            
        default:
            return numbers;
    }
}