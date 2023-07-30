"use client"

import * as React from 'react';
// @ts-ignore
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Slide } from '@mui/material';
// @ts-ignore
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
// @ts-ignore
const BootstrapDialogMenu = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root ': {
        borderRadius: 0,
        width: 280,
        left: 0,
        position: 'absolute',
        top: 0,
        minHeight: '100vh',
        margin: 0
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
                        // @ts-ignore
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="left" mountOnEnter ref={ref}  {...props} />
})
interface CustomizedDialogsProps {
    children: React.ReactNode,
    open: boolean,
    title?: string,
    handelOpen: () => void,
    menuDailog?: Boolean
}

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({ children, open, title, handelOpen, menuDailog }) => {

    // let scrollWrap = React.createRef<HTMLDivElement>()
    // setTimeout(() => {
    //     console.log(scrollWrap.current)
    //     scrollWrap.current?.addEventListener('scroll', () => {
    //         console.log('scroll')
    //     })
    // }, 50);


    return (

        <div>
            {menuDailog ?
                <BootstrapDialogMenu
                    onClose={() => handelOpen()}
                    aria-labelledby="customized-dialog-menu"
                    open={open}
                    // @ts-ignore
                    transitioncomponent={Transition}
                    keepMounted
                >
                    <DialogContent dividers
                        className='no-scrollbar'
                    >
                        {children}
                    </DialogContent>
                </BootstrapDialogMenu>
                :
                <BootstrapDialog
                    onClose={() => handelOpen()}
                    // aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    {title && <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handelOpen()}>
                        {title}
                    </BootstrapDialogTitle>
                    }
                    <DialogContent dividers
                        className='no-scrollbar'
                    >
                        {children}
                    </DialogContent>
                </BootstrapDialog>

            }

        </div>
    );
}

export default CustomizedDialogs