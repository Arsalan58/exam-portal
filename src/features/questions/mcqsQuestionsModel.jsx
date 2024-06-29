import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialValues = {
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    question: "",
    correctAnswer: ""
}

export const mcqSlice = createSlice({
    name: "mcqSlice",
    initialState:initialValues,
    reducers: {
        setInitialValues: (state, action) => {
            return state = action.payload
        },
        // removeTodo: (state, action) => {
        //     state.todos = state.todos.filter((todo) => {
        //         return todo.id !== action.payload
        //     })
        // },
    }
})

export const { setInitialValues } = mcqSlice.actions
export default mcqSlice.reducer