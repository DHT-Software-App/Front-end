import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState} from "react"
import { Folder, PhotoAlbum, PictureAsPdf } from "@mui/icons-material";


export const Documents = () => {

   // for modal open status
   const [openEdit, setOpenEdit] = useState<boolean>(false);
   const [openNew, setOpenNew] = useState<boolean>(false);
   const [openDelete, setOpenDelete] = useState<boolean>(false);
   const [open, setOpen] = useState(false);

  return <div className="flex flex-col gap-y-4 p-12 bg-gray-100 relative">
     <div className="capitalize font-bold text-2xl text-slate-600  flex flex-col md:flex-row justify-between items-baseline gap-8" >
        <div className="p-4 w-full md:w-auto">
          Documents
        </div>

      </div>

      <Box sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell width={20} />
                <TableCell> 
                  <Folder className='mr-3' color='inherit' fontSize='small' />
                  Name
                </TableCell>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Modified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell width={20}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <PhotoAlbum className='mr-3' color='inherit' fontSize='small' />
                    Photos
                  </TableCell>
                  <TableCell align="left">Luis R. Fernandez</TableCell>
                  <TableCell align="left">TARP</TableCell>
                  <TableCell align="left">123 Main Str, New York, NY 10030</TableCell>
                  <TableCell align="left">Last modification at 2018-05-01</TableCell>
                </TableRow>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }} >
                        <Table size="small" aria-label="purchases" >
                          <TableBody>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="left" >
                                <div className="flex">
                                  <img
                                    src="https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2021/04/Mold-Remediation-Cost.jpg"
                                    className='h-7 w-7 mx-3 rounded-sm cursor-pointer opacity-100 hover:opacity-75 duration-200'
                                  />

                                  undefined
                                </div>
                              </TableCell>
                              <TableCell align="left" colSpan={2}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit aliquid consectetur,</TableCell>
                              <TableCell align="left" className='font-bold'>12:15 a.m.</TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="left" >
                                <div className="flex">
                                  <img
                                    src="https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2021/04/Mold-Remediation-Cost.jpg"
                                    className='h-7 w-7 mx-3 rounded-sm cursor-pointer opacity-100 hover:opacity-75 duration-200'
                                  />

                                  undefined
                                </div>
                              </TableCell>
                              <TableCell align="left" colSpan={2}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit aliquid consectetur,</TableCell>
                              <TableCell align="left" className='font-bold'>12:15 a.m.</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                
                </TableRow>
              </>

              <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell width={20}>
                   
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <PictureAsPdf className='mr-3' color='inherit' fontSize='small' />
                    Contract
                  </TableCell>
                  <TableCell align="left">Luis R. Fernandez</TableCell>
                  <TableCell align="left">TARP</TableCell>
                  <TableCell align="left">123 Main Str, New York, NY 10030</TableCell>
                  <TableCell align="left">Last modification at 2018-05-01</TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </TableContainer>

          {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow> */}
        </Box>
  </div>

 }