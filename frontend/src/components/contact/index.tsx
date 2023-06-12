'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
} from '@mui/material';
import { BiX } from "react-icons/bi";
import AddContactForm from "./addContactForm";

const Contact = (props: any) => {
    const {open,handleOpen} =props;
    return (
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle>Add Contact</DialogTitle>
        <Box position="absolute" top={0} right={0} 
          onClick={handleOpen}
        >
          <IconButton >
            <BiX  />
          </IconButton>
        </Box>
        <DialogContent>
            <AddContactForm />
        </DialogContent>
        
      </Dialog>
    );


}

export default Contact;