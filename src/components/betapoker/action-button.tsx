import { FC } from 'react';
import { Box } from '@mui/material';
import { Button } from 'react-nes-component';

interface ActionButtonProps {
    disabled?: boolean,
    action?: Function
}

const ActionButton: FC<ActionButtonProps> = (props) => {

    const sty = {
        width: '100%',
        backgroundColor: props.disabled ? 'RGB(180, 180, 180)' : null
    }


    return (
        <Box width={{
            xs: 60,
            sm: 80,
            md: 70,
            lg: 100
        }}>
            <Button style={sty} onClick={props.disabled? null : props.action}>{props.children}</Button>
        </Box>
    )
};

export default ActionButton;