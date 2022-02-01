import { Box, Grid } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import CardSpread from './card-spread';
import Card from './card';
import RoboAvatar from './robo-avatar';

interface GameDisplayProps {
    playerCards: string[],
    aiCards: string[],
    commCards: string[],
}

const GameDisplay: FC<GameDisplayProps> = () => {

    return (
        <Grid container direction='row' width='100%' height='100%'>
            <Grid item xs={6} container direction='column' >
                <Grid item xs={8} />
                <Grid item xs={8}>
                    <CardSpread ids={playerCards} />
                </Grid>
                <Grid item xs={8} />
            </Grid>
            <Grid item xs={12} container direction='column' >
                <Grid item xs={8}>
                    <CardSpread ids={commCards} />
                </Grid>
                <Grid item xs={8} container justifyContent="center" alignItems="center">
                    <Card id='as' flipped turned />
                </Grid>
                <Grid item xs={8} container justifyContent='space-between' alignItems='center'>
                    {buttons}
                </Grid>
            </Grid>
            <Grid item xs={6} container direction='column' >
                <Grid item xs={8} container justifyContent="center" alignItems="center">
                    <RoboAvatar />
                </Grid>
                <Grid item xs={8}>
                    <CardSpread flipped ids={aiCards} />
                </Grid>
                <Grid item xs={8} />
            </Grid>
        </Grid>
    )

}


export default GameDisplay;