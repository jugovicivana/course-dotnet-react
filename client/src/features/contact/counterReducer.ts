//tipovi akcija za identifikaciju u reducer funkciji
export const INCREMENT_COUNTER="INCREMENT_COUNTER";
export const DECREMENT_COUNTER="DECREMENT_COUNTER";


//definise se struktura stanja
export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState={
    data:42,
    title: 'YARC (yet another redux counter)'
}

//akcije za mijenjanje stanja
export function increment(amount=1){
   return {
    type: INCREMENT_COUNTER,
    payload: amount
   } 
}

export function decrement(amount=1){
    return {
     type: DECREMENT_COUNTER,
     payload: amount
    } 
 }

 //definise strukturu akcije koja se koristi
 interface CounterAction {
    type: string, 
    payload: number
 }


 //KORISCENJEM REDUCERA I AKCIJA MOZE SE CENTRALIZOVANO UPRAVLJATI STANJEM
 //STO OLAKSAVA PRAĆENJE PROMJENA I SKALIRANJE APLIKACIJE

 //prima stanje i akciju, radi ono sto treba zavisno od akcije
export default function counterReducer(state=initialState, action: CounterAction){
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state, //kreira kopiju trenutnog stanja da se ocuvaju sve ostale vr unutar njega
                data: state.data+action.payload
            }
    
        case DECREMENT_COUNTER:
            return {
                ...state, //kreira kopiju
                data: state.data-action.payload
            }
    
        default:
            return state;
    }
}