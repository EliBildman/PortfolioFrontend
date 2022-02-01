import { FC } from 'react';
import { Box } from '@mui/material';

const RoboAvatar: FC = () => {
    return (
        <Box width={{
                xs: 60, 
                md: 70,
                lg: 90
            }}
        >
           <img 
                src='/images/happyrobot.png'
                alt='robot' 
                style={{ 
                    imageRendering: 'pixelated',
                    transform: 'scaleX(-1)',
                    width: '100%'
            }} />
        </Box>
    )
};

export default RoboAvatar;

