import React, { useState } from 'react'
import { Box, Button, Collapse, Grid, Paper, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinearGradient } from 'react-text-gradients'
import { TypeAnimation } from 'react-type-animation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function EmailSender() {
    const [fields, setFields] = useState({ to: '', subject: '', msg: '' })
    const [responses, setResponses] = useState([])
    const onFieldChange = (e) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(fields)
        const request = axios.post('http://localhost:8001/api/sendmailrequest', fields)
        toast.promise(request, {
            pending: {
                render() {
                    return (
                        'Sending Mail Request'
                    )
                }
            },
            success: {
                render(res) {
                    //console.log(res)
                    setResponses([res.data.data, ...responses])
                    setFields({ to: '', subject: '', msg: '' })
                    return res.data.data.remark
                }
            },
            error: {
                render(err) {
                    //console.log(err)
                    setResponses([err.data.response.data, ...responses])

                    return err.data.response.data.remark
                }
            }
        })


    }
    return (
        <>
            <Box sx={{ minHeight:'100vh', backgroundImage: 'url(12244.jpg)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', }} >
                    <Grid item xs={12} lg={12}>

                        <Typography variant='h3' textAlign={'center'} fontFamily={'"Times New Roman", Times, serif;'} ><LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
                            <TypeAnimation
                                sequence={[
                                    "Email Service", // Types 'One'
                                    5000, // Waits 1s
                                    '',
                                ]}

                                cursor={true}
                                repeat={Infinity}

                            />
                        </LinearGradient>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <img src='https://www.bing.com/th/id/OGC.0a29bcbfb7123e00ccbdf80df109a087?pid=1.7&rurl=https%3a%2f%2fbuildial.com%2ffrontend%2fassets%2fimg%2femail.gif&ehk=2T3%2f%2bri0IpC6%2fPz968lC7HtTw4MPWzL3U83gQasPplE%3d' alt='mail' style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <Paper elevation={3} sx={{ p: 3, m: 4 }}>
                            <Stack component={'form'} onSubmit={handleSubmit} spacing={2} direction={'column'} sx={{ width: '100%' }} >
                                <TextField
                                    type='email'
                                    label='To'
                                    size='small'
                                    fullWidth
                                    required
                                    name='to'
                                    value={fields.to}
                                    onChange={onFieldChange}
                                />
                                <TextField
                                    type='text'
                                    label='Subject'
                                    size='small'
                                    fullWidth
                                    required
                                    name='subject'
                                    value={fields.subject}
                                    onChange={onFieldChange}
                                />
                                <TextField
                                    type='text'
                                    label='Message'
                                    size='small'
                                    multiline
                                    minRows={4}
                                    maxRows={4}
                                    fullWidth
                                    required
                                    name='msg'
                                    value={fields.msg}
                                    onChange={onFieldChange}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button type='submit' variant='contained' color='info' >Send Mail</Button>
                                </Box>
                            </Stack>

                        </Paper>

                    </Grid>
                    <Grid item xs={12} lg={10}>
                        <Collapse in={responses.length !== 0} timeout={'auto'} unmountOnExit >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Recipient Mail</StyledTableCell>
                                            <StyledTableCell align="center">Status</StyledTableCell>
                                            <StyledTableCell align="center">Attempts</StyledTableCell>
                                            <StyledTableCell align="center">Mail Type</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {responses.map((row, index) => (
                                            <StyledTableRow key={index}>

                                                <StyledTableCell align="center">{row.recipient_mail}</StyledTableCell>
                                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                                                <StyledTableCell align="center">{row.attempts}</StyledTableCell>
                                                <StyledTableCell align="center">{row.type}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Collapse>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

        </>
    )
}

export default EmailSender