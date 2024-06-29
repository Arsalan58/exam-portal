import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, FormGroup, Paper, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ec407a',
      main: '#ec407a',
      dark: '#fffff',
      contrastText: '#ec407a',
    },
  },
});
const QuestionCard = ({ setInitialValues, initialValues, editValues, data, rows, setRows, handleOpen, local = false }) => {
  return local ? (
    <ThemeProvider theme={theme}>
      <Paper sx={{ marginY: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography display={"flex"} justifyContent={"space-between"} variant="h5" component="h2">
              <div dangerouslySetInnerHTML={{ __html: data.question }}>
                {/* {data.question} */}
              </div>
              <Box>
                <IconButton m={0} p={0} color={"success"} variant="contained" onClick={() => {
                  handleOpen()
                  // setRow(row)
                }} label="Edit" aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => {
                  localStorage.setItem("questions", JSON.stringify(JSON.parse(localStorage.getItem("questions")).filter((value, index) => {
                    return data.id !== value.id
                  })))
                  // setRows((...prev) => {
                  //   return [...prev, ...JSON.parse(localStorage.getItem("questions")).filter((value, index) => {
                  //     return data.id !== value.id
                  //   })]
                  // })
                  // setRows((...prev) => {
                  //   return prev
                  // })
                  console.log(JSON.parse(localStorage.getItem("questions")).filter((value, index) => {
                    return data.id !== value.id
                  }))
                }} color="secondary" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {["A", "B", "C", "D"].map((option, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox disabled checked={`option${option}` == data.correctAnswer ? true : false} />}
                    label={<div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: data[`option${option}`] }}></div>}
                  />
                )
              })

              }
              {/* <FormControlLabel
              control={<Checkbox disabled checked={ } />}
              label={<div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: data.optionA }}></div>}
            />
            <FormControlLabel
              control={<Checkbox disabled checked={ } />}
              label={<div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: data.optionB }}></div>}
            />
            <FormControlLabel
              control={<Checkbox disabled checked={ } />}
              label={<div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: data.optionC }}></div>}
            />
            <FormControlLabel
              control={<Checkbox disabled checked={ } />}
              label={<div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: data.optionD }}></div>}
            /> */}
            </FormGroup >
          </CardContent>
        </Card>
      </Paper>
    </ThemeProvider >
  ) : (
    <ThemeProvider theme={theme}>
      <Paper sx={{ marginY: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography display={"flex"} justifyContent={"space-between"} variant="h5" component="h2">
              <div dangerouslySetInnerHTML={{ __html: data.question }}>
                {/* {data.question} */}
              </div>
              <Box>
                <IconButton m={0} p={0} color={"success"} variant="contained" onClick={() => {
                  console.log(data, "+++++++++++++++++++++++++++++++++++data")
                  setInitialValues({
                    question: 'kjasdjsak',
                        optionA: 'asdsad',
                        optionB: 'lkasd',
                        optionC: '',
                        optionD: '',
                        correctAnswer: ''
                  })
                  console.log(initialValues)
                  handleOpen()
                  // setRows(dasta)
                }} label="Edit" aria-label="delete">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={async () => {
                  console.log(rows, "---------------------rows")
                  console.log(rows.filter((value, index) => {
                    return data.id !== value.id
                  }), "----------------------------prev")
                  const deletedRow = await axios.delete(`https://genuine-guided-snipe.ngrok-free.app/panel/delete/question?id=${data.id}`, {
                    headers: {
                      "ngrok-skip-browser-warning": true,
                      "Authorization": localStorage.getItem("token")
                    }
                  })
                  console.log(deletedRow, "====================deleted row")
                  let newRow = rows.filter((value, index) => {
                    return data.id !== value.id
                  })
                  setRows(newRow)
                }} color="secondary" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {["A", "B", "C", "D"].map((option, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox disabled checked={`option${option}` == data.correctAnswer ? true : false} />}
                    label={<div style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: data[`option${option}`] }}></div>}
                  />
                )
              })

              }

            </FormGroup >
          </CardContent>
        </Card>
      </Paper>
    </ThemeProvider >
  );
}

export default QuestionCard;
