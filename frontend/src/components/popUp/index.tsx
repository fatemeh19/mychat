"use client"

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
        // padding: theme.spacing(2),
        paddingTop: 0,
        border: 'none',
        padding: 0,
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        webkitScrollbarWidth: 5,
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
                m: 0, p: 2, mr: 8,
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

    // let scrollWrap = React.createRef<HTMLDivElement>()
    // setTimeout(() => {
    //     console.log(scrollWrap.current)
    //     scrollWrap.current?.addEventListener('scroll', () => {
    //         console.log('scroll')
    //     })
    // }, 50);


    return (
        <div>
            <BootstrapDialog
                onClose={() => handelOpen()}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handelOpen()}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers
                    className='no-scrollbar'
                >
                    {children}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default CustomizedDialogs