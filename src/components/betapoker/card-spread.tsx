import { FC } from 'react';
import { Grid } from '@mui/material';
import Card from './card';

interface CardSpreadProps {
    ids: string[],
    flipped?: boolean,
}

const CardSpread: FC<CardSpreadProps> = (props) => {

    const card_list = props.ids.map((id, ind) => (
        <Grid item key={ind}>
            <Card id={id} flipped={props.flipped} />
        </Grid>
    ));

    return (
        <Grid
            width='100%'
            height='100%'
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {card_list}
        </Grid>
    );

};

export default CardSpread;