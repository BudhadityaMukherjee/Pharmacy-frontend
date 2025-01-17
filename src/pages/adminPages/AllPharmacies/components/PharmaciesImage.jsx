import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 4,
    '@media screen and (min-width: 64em)': {
        width: '500px'
    }
};

const PharmaciesImage = ({ setOpen, open, currCerificate }) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className="flex justify-center items-center"
                    >
                        <img
                            className=" bg-[#f5f5f5] w-[320px] h-[500px] "
                            src={`http://localhost:3003/images/${currCerificate}`}
                            alt="userImage"
                        />
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default PharmaciesImage;
