import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useSearchParams } from 'react-router-dom'
import QuestionModal from "@/components/modals/QuestionModal.jsx";
import Button from "@mui/material/Button";
import { Box, ButtonGroup, Container, Grid, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DataGrid } from '@mui/x-data-grid';
import Mcqs from '../components/modals/Mcqs';
import QuestionCard from '../components/QuestionCard';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';



const Question = () => {
    const [initialValues, setInitialValues] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: ''
    });
    
    console.log(initialValues,"------initialValues");
    const editValues = (values)=>{
        setInitialValues(values)
    }
    const [params, setSearchParams] = useSearchParams()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // setInitialValues({
        //     question: '',
        //     optionA: '',
        //     optionB: '',
        //     optionC: '',
        //     optionD: '',
        //     correctAnswer: ''
        // })
        setOpen(false);
    };

    // ADD TYPE MENU ITEMS  STATE AND FUNCTIONS
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openType = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOpenClose = () => {
        setAnchorEl(null);
    };

    const [type, setType] = useState("MCQs")
    // console.log(params.get("exam-id"))

    // TABLE DATA
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'options',
            headerName: 'options',
            width: 150,
            editable: true,
        },
        {
            field: 'question',
            headerName: 'question',
            width: 150,
            editable: true,
        },
        {
            field: 'correctAnswers',
            headerName: 'correctAnswers',
            type: 'number',
            width: 110,
            editable: true,
        },

    ];

    const [rows, setRows] = useState([
        {}
        // { id: 1, question: 'Snow', correctAnswers: 'Jon', options: 14 },
        // { id: 2, question: 'Lannister', correctAnswers: 'Cersei', options: 31 },
    ])
    const renderLocalData = useCallback(() => {
        // console.log("............=renderLocalData",)
        return localStorage.getItem("questions") ? JSON.parse(localStorage.getItem("questions")).map((value, i) => {
            // console.log(value)
            if (params.get("exam-id") == value.courseId) {
                return (
                    <QuestionCard handleOpen={handleClickOpen} local={true} setRows={setRows} key={i} data={value} />
                )
            }
        }) : null
    }, [rows])
    useEffect(() => {
        let data = fetch(`https://genuine-guided-snipe.ngrok-free.app/panel/retrieve/question?examId=${params.get("exam-id")}`, {
            headers: {
                "ngrok-skip-browser-warning": true,
                "Authorization": localStorage.getItem("token")
            }
        })
        data.then((data) => {
            return data.json()
        }).then((data) => {
            setRows(data.data.allData)
            // console.log(data.data.allData)
        })

    }, [])

    // console.log("-------------------question page");
    return (
        <>
            <Grid container justifyContent={"flex-end"} my={2} p={2}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button color="error" endIcon={<AddIcon />} onClick={handleClickOpen}>Add</Button>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {type}
                        <Menu
                            onClick={(e) => { e.stopPropagation() }}
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openType}
                            onClose={() => { setAnchorEl(null); }}
                        >
                            <MenuItem onClick={() => {
                                setType("MCQs")
                                handleOpenClose()
                            }}>MCQs</MenuItem>
                            <MenuItem onClick={() => {
                                setType("description")
                                handleOpenClose()
                            }}>Descriptive</MenuItem>

                        </Menu>
                    </Button>
                </ButtonGroup>
            </Grid>
            <Container display="flex" style={{ backgroundColor: "" }}>


                {
                    rows?.map((value, i) => {
                        return <QuestionCard initialValues={initialValues} setInitialValues={setInitialValues} editValues={editValues} handleOpen={handleClickOpen} rows={rows} setRows={setRows} key={i} data={value} />
                    })
                }
                {
                    // renderLocalData()
                }

            </Container>
            <Box position={"fixed"} bottom={20} right={60} alignSelf={"baseline"}>
                <Button onClick={() => {
                    localStorage.setItem("questions", JSON.stringify(JSON.parse(localStorage.getItem("questions")).filter((value) => {
                        return +params.get("exam-id") != value.courseId
                    })))
                    setRows([])
                }} disabled={JSON.parse(localStorage.getItem("questions"))?.find((value) => value.courseId == params.get("exam-id")) ? false : true} variant="contained">ReFetch</Button>
            </Box>
            {type == "description" ? <QuestionModal open={open} setOpen={setOpen} handleClose={handleClose} handleClickOpen={handleClickOpen} /> : type == "MCQs" ? <Mcqs initialValues={initialValues} open={open} rows={rows} setRows={setRows} setOpen={setOpen} handleClose={handleClose} handleClickOpen={handleClickOpen} /> : null}
        </>
    )
}

export default Question
