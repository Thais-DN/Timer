import { ReactNode, createContext, useState, useReducer } from "react";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";
import {
    ActionTypes,
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    creatNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CycleContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducers, {
        cycles: [],
        activeCycleId: null,
    });

    const [amountSecondsPassed, setAmoutSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmoutSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function creatNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch(addNewCycleAction(newCycle));

        setAmoutSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction);
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                creatNewCycle,
                interruptCurrentCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}
