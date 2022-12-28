export class ReduxFunctions {

    static numbersRegistered: any;

    constructor(){}

    static getNumbers():any{
        const data = localStorage.getItem('numbersRegistered') ?? '[]'
        return data;
    }
}