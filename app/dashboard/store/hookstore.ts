import { create } from 'zustand'
export const useInputStore = create((set) => ({
    inputValue: '',
    setInputValue: (newValue: any) => set({ inputValue: newValue })

}))

interface TaskState {
    tTask: any[];
    setTasks: (Task: any[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tTask: [],
    setTasks: (tTask: any[]) => set({ tTask }),
}));