import {configureStore} from "@reduxjs/toolkit"
import mcqSlice from "../features/questions/mcqsQuestionsModel"
export const store = configureStore({
    reducer:{
        mcqSlice:mcqSlice
    }
})