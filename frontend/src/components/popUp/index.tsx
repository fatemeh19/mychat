import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root ': {
        borderRadius: 10,
        width: 390,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        paddingTop : 0,
        border : 'none'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle 
            sx={{ 
                m: 0, p: 2,
                fontFamily: 'vazir',
                fontWeight: 500, fontSize: 17 
            }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

interface CustomizedDialogsProps {
    children: React.ReactNode,
    open: boolean,
    title: string,
    handelOpen: () => void
}

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({ children, open, title, handelOpen }) => {

    return (
        <div>
            <BootstrapDialog
                onClose={() => handelOpen()}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handelOpen()}>
                    <h1 className='mr-8'>{title}</h1>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default CustomizedDialogs