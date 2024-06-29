import React from "react"
import "./App.css"
import Routing from "./routes/Routing";
import CustomModal from "./components/CustomModal";
import QuestionModal from "./components/modals/QuestionModal.jsx";
import QuestionAnswerForm from "./components/QuestionAnswerForm.jsx";
import CustomSnackBar from "./components/CustomSnackBar.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
const App = () => {
   return (
      <Provider store={store}>
         <Routing />
         {/* <CustomSnackBar message="asdbjasb" type="success"/> */}
      </Provider>
   )
}
export default App;