import { FC } from 'react';
import { Box } from '@mui/material';

interface CardProps {
    id: string,
    flipped?: boolean,
    turned?: boolean
}

const Card: FC<CardProps> = (props) => {

    const img_src = props.flipped ? '/images/pokercards/back2.png' :  `/images/pokercards/${props.id}.png`
    const alt = props.flipped ? 'face down poker card' : `card ${props.id}`

    return (
        <Box width={{
            xs: 40,
            sm: 48,
            md: 52,
            lg: 65
        }}>
            <img src={img_src} alt={alt} style={{
                width: '100%',
                imageRendering: 'pixelated',
                transform: (props.turned ? 'rotate(90deg)' : '')
            }}/>
        </Box>     
        
    )
};

export default Card;