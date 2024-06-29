import React, { useState } from 'react';
import {
    AppBar, Box, Button, Container, CssBaseline, Drawer, FormControl, FormControlLabel, FormGroup,
    IconButton, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography, Checkbox, InputAdornment, Input
} from '@mui/material';
import { Menu as MenuIcon, Add as AddIcon, Search as SearchIcon, Close as CloseIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { CKEditor } from 'ckeditor4-react';

const Exams = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [examName, setExamName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [status, setStatus] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtersVisible, setFiltersVisible] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log({ examName, description, course, status });
        setModalOpen(false);
        setExamName('');
        setDescription('');
        setCourse('');
        setStatus(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Exam Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Filter</InputLabel>
                            <Select defaultValue="Equal" label="Filter">
                                <MenuItem value="Equal">Equal</MenuItem>
                                <MenuItem value="Contains">Contains</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder="Search by exam"
                            variant="outlined"
                            size="small"
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
                            <Select defaultValue="0" label="Status">
                                <MenuItem value="0">Active</MenuItem>
                                <MenuItem value="1">Inactive</MenuItem>
                                <MenuItem value="2">All</MenuItem>
                                <MenuItem value="3">Deleted</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={() => setFiltersVisible(!filtersVisible)}>
                            <FilterListIcon />
                        </IconButton>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleModalToggle}>
                            Create Exam
                        </Button>
                    </Box>
                    {filtersVisible && (
                        <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                            <Typography variant="h6">Advanced Filters</Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select defaultValue="0" label="Status">
                                        <MenuItem value="0">Active</MenuItem>
                                        <MenuItem value="1">Inactive</MenuItem>
                                        <MenuItem value="2">All</MenuItem>
                                        <MenuItem value="3">Deleted</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Exam Name</InputLabel>
                                    <Select defaultValue="0" label="Exam Name">
                                        <MenuItem value="0">Exam Name</MenuItem>
                                        <MenuItem value="1">Course Name</MenuItem>
                                        <MenuItem value="2">Exam Type</MenuItem>
                                        <MenuItem value="3">Status</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Filter By</InputLabel>
                                    <Select defaultValue="0" label="Filter By">
                                        <MenuItem value="0">Ends With</MenuItem>
                                        <MenuItem value="1">Starts With</MenuItem>
                                        <MenuItem value="2">Equal</MenuItem>
                                        <MenuItem value="3">Not Equal</MenuItem>
                                        <MenuItem value="4">Contains</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Exam Name</InputLabel>
                                    <Select defaultValue="0" label="Exam Name">
                                        <MenuItem value="0">Exam Name</MenuItem>
                                        <MenuItem value="1">Course Name</MenuItem>
                                        <MenuItem value="2">Exam Type</MenuItem>
                                        <MenuItem value="3">Status</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                                <Button variant="outlined">Add Filter</Button>
                                <Button variant="outlined">Add Filter</Button>
                                <Button variant="outlined">Add Filter</Button>
                            </Box>
                        </Box>
                    )}
                    {/* Add more content here */}
                </Container>
            </Box>
            <Modal open={modalOpen} onClose={handleModalToggle}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper',
                    border: '2px solid #000', boxShadow: 24, p: 4
                }}>
                    <form onSubmit={handleFormSubmit}>
                        <Typography variant="h6" component="h2">
                            Create new exam
                        </Typography>
                        <TextField
                            fullWidth
                            label="Exam Name"
                            value={examName}
                            onChange={(e) => setExamName(e.target.value)}
                            required
                            sx={{ my: 2 }}
                        />
                        <InputLabel>Description</InputLabel>
                        <CKEditor
                            data={description}
                            onChange={(event) => setDescription(event.editor.getData())}
                        />
                        <FormControl fullWidth required sx={{ my: 2 }}>
                            <InputLabel>Select course</InputLabel>
                            <Select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="1">Course One</MenuItem>
                                <MenuItem value="2">Course Two</MenuItem>
                                <MenuItem value="3">Course Three</MenuItem>
                            </Select>
                        </FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                                label="Only Active"
                            />
                        </FormGroup>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                            <Button type="submit" variant="contained">Create</Button>
                            <Button onClick={handleModalToggle} variant="outlined">Cancel</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default Exams;
