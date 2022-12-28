import { Action } from "@ngrx/store"

export const GETNUMBERSREGISTERS = '[Redux] Get Numbers Registers'

export class GetNumbersRegistersAction implements Action{
    readonly type = GETNUMBERSREGISTERS;
}