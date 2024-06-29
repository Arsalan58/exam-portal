import { Autocomplete, Avatar, Grid, Icon, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography, Checkbox, InputAdornment, Input
} from '@mui/material';
import { Menu as MenuIcon, Add as AddIcon, Search as SearchIcon, Close as CloseIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { CKEditor } from 'ckeditor4-react';
import DataTables from '../tables/DataTables';
import { GridActionsCellItem } from '@mui/x-data-grid';
import CustomModal from '../components/CustomModal';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CategoryModal from '../components/modals/CategoryModal';
import ExamModal from '../components/modals/ExamModal';

function ExamIcon(props) {

    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
                <path d="M4,6H2v14c0,1.1,0.9,2,2,2h14v-2H4V6z M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H8V4h12V16z M13.51,10.16c0.41-0.73,1.18-1.16,1.63-1.8c0.48-0.68,0.21-1.94-1.14-1.94c-0.88,0-1.32,0.67-1.5,1.23l-1.37-0.57C11.51,5.96,12.52,5,13.99,5c1.23,0,2.08,0.56,2.51,1.26c0.37,0.6,0.58,1.73,0.01,2.57c-0.63,0.93-1.23,1.21-1.56,1.81c-0.13,0.24-0.18,0.4-0.18,1.18h-1.52C13.26,11.41,13.19,10.74,13.51,10.16z M12.95,13.95c0-0.59,0.47-1.04,1.05-1.04c0.59,0,1.04,0.45,1.04,1.04c0,0.58-0.44,1.05-1.04,1.05C13.42,15,12.95,14.53,12.95,13.95z" />
            </g>
        </SvgIcon>
    );
}


const Exams = () => {
    let navigate = useNavigate()
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setRow({
            id: "",
            title: '',
            categoryName: '',
            categoryName: '',
            status: true
        })
        setOpen(false)
    };
    const [open, setOpen] = useState(false);

    // categoryModal functions and states
    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    const handleOpenCategoryModal = () => {
        setOpenCategoryModal(true);
    };

    const handleCloseCategoryModal = () => {
        setOpenCategoryModal(false);
    };
    // categoryModal functions and states end


    const [initialValues, setInitialValues] = useState({

    })
    const examTags = [
        // { title: 'SSC', year: 1994 },
        { title: 'CLAT', year: 1972 },
        { title: 'MAINS', year: 1974 },
        { title: 'NEET', year: 2008 },
    ];
    const [searchTerm, setSearchTerm] = useState()
    const columns = [
        {
            field: "id",
            headerName: "id",
            editable: true,
            width: 150,
            flex: 1,
        },
        {
            field: 'title',
            headerName: 'Exam name',
            width: 150,
            editable: true,
            flex: 1,

        },
        {
            field: 'categoryName',
            headerName: 'Course name',
            width: 150,
            flex: 1,
            editable: true,
        },
        // {
        //     field: 'categoryName',
        //     headerName: 'Exam Type',
        //     width: 150,
        //     flex: 1,
        //     editable: true,
        // },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            flex: 1,
            renderCell: ({ row }) => {
                let [status, setStatus] = useState(Boolean(row.status))
                return <Switch checked={status} onChange={() => {
                    setStatus(!status)
                    // Api Call

                }} />
            },
        },
        {
            field: "action",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <>
                        <IconButton color={"success"} variant="contained" onClick={() => {
                            handleOpen()
                            setRow(row)
                            console.log(row)
                        }} label="Edit" aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton color={"secondary"} variant="contained" onClick={() => {
                            console.log(row.id)
                            navigate(`/question?exam-id=${row.id}`)
                        }} label="Edit">
                            <AddCircleIcon />
                        </IconButton>
                    </>
                )
            },
        }

    ];

    const [row, setRow] = useState({
        title:"",
        instructions:"",
        examStartAt:"",
        examEndAt:"",
        examDuration:"",
        searchTags:"",
        viewSolutions:"",
        examResult:"",
        cutOff:"",
        maxMarks:"",
        passMessage:"",
        failMessage:"",
        status:"",
        categoryId:"",
        mode:"",
        fee:"",
        negativeMarking:""
    })
    const [rows, setRows] = useState([])

    React.useEffect(() => {
        let data = fetch("https://genuine-guided-snipe.ngrok-free.app/panel/retrieve/exam", {
            headers: {
                "ngrok-skip-browser-warning": true,
                "Authorization": localStorage.getItem("token")
            }
        })
        data.then((data) => {
            return data.json()
        }).then((data) => {
            setRows(data.data.allData)
            console.log(data.data.allData)
        }).catch((error) => {
            console.log(error)
        })

    }, [row])
    return (
        <Box p={4} bgcolor={""}>
            <Grid container>
                <Grid item bgcolor={""} xs={12} lg={2.5}>
                    <Box component="div" display="flex" alignItems="center" gap={2}>
                        <ExamIcon />
                        <Box>
                            <Typography variant="h5" fontWeight="600" color="black">Exam</Typography>
                            <Typography variant="body2" color="textSecondary">Manage your exams</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item bgcolor={""} xs={12} lg={9.5} mt={{ xs: 3, lg: 0 }}>
                    <Grid container sx={{ gap: 2 }} alignItems={"center"} justifyContent={{ xs: "space-evenly", lg: "flex-end" }}>
                        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Filter</InputLabel>
                            <Select defaultValue="Equal" name='filter' label="Filter">
                                <MenuItem value="Equal">Equal</MenuItem>
                                <MenuItem value="Contains">Contains</MenuItem>
                            </Select>
                        </FormControl>
                        <Autocomplete
                            sx={{ minWidth: 120 }}
                            multiple
                            id="tags-outlined"
                            options={examTags}
                            getOptionLabel={(option) => option.title}
                            defaultValue={[examTags[0]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Exam tags"
                                    placeholder="Favorites"
                                />
                            )}
                        />
                        <TextField
                            placeholder="Search by exam"
                            variant="outlined"
                            size="small"
                            name="title"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Status</InputLabel>
                            <Select defaultValue="0" name="status" label="Status">
                                <MenuItem value="0">Active</MenuItem>
                                <MenuItem value="1">Inactive</MenuItem>
                                <MenuItem value="2">All</MenuItem>
                                <MenuItem value="3">Deleted</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={() => setFiltersVisible(!filtersVisible)}>
                            <FilterListIcon />
                        </IconButton>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                            Create Exam
                        </Button>
                        {/* category modal starts */}
                        <Button variant="contained" color="primary" onClick={handleOpenCategoryModal}>
                            Add Category
                        </Button>
                        <CategoryModal open={openCategoryModal} handleClose={handleCloseCategoryModal} />
                        {/* category modal ends */}

                    </Grid>
                </Grid>
                <Grid item xs={12} bgcolor={""} my={3}>
                    <DataTables columns={columns} rows={rows} />
                </Grid>
            </Grid>
            {/* MODAL START*/}

            <ExamModal setRows={setRows} handleOpen={handleOpen} row={row} handleClose={handleClose} open={open} />
        </Box>
    )
}

export default Exams
