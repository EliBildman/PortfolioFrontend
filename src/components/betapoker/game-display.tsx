import { Grid, Typography } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import CardSpread from './card-spread';
import Card from './card';
import RoboAvatar from './robo-avatar';
import ActionButton from './action-button';
import PlayerAvatar from './player-avatar';

interface GameDisplayProps {
    playerCards: string[],
    aiCards: string[],
    commCards: string[],
    takingUserInput: boolean,
    legalUserActions: string[],
    gameActive: boolean,
    userInputCallback: Function,
    startCallback: Function,
    statusMessage: string,
    bets: number[],
    takes: number[],
}

const GameDisplay: FC<GameDisplayProps> = (props) => {

    const buttons = ['Fold', 'Call', 'Raise'].map((action) => {
        return (
            <ActionButton
                disabled={!props.takingUserInput || !props.legalUserActions.includes(action.toLowerCase())}
                action={() => props.userInputCallback(action.toLowerCase())}
                key={action}
            >
                {action}
            </ActionButton>
        )
    });

    let center;
    let playerStatus;
    let aiStatus;

    if (props.gameActive) {
        center = (<Card id='as' flipped turned />);
        playerStatus = (<Typography >Bet: {props.bets[0]}</Typography>);
        aiStatus = (<Typography>Bet: {props.bets[1]}</Typography>);
    } else {
        center = (<ActionButton action={props.startCallback}>Start</ActionButton>);
        playerStatus = (<Typography>Take: {props.takes[0]}</Typography>);
        aiStatus = (<Typography>Take: {props.takes[1]}</Typography>);
    }

    return (
        <Grid container direction='row' width='100%' height='100%'>
            <Grid item xs={6} container direction='column' >
                <Grid item xs={8} container justifyContent="center" alignItems="center" >
                    <PlayerAvatar />
                </Grid>
                <Grid item xs={7}>
                    <CardSpread ids={props.playerCards} />
                </Grid>
                <Grid item container justifyContent='center' color='white' xs={8} >
                    {playerStatus}
                </Grid>
            </Grid>
            <Grid item xs={12} container direction='column' >
                <Grid item xs={7}>
                    <CardSpread ids={props.commCards} />
                </Grid>
                <Grid item xs={7} container justifyContent="center" alignItems="center">
                    {center}
                </Grid>
                <Grid item xs={3} container justifyContent="center" alignItems="center">
                    <Typography color='white'>
                        {props.statusMessage}
                    </Typography>
                </Grid>
                <Grid item xs={7} container justifyContent='space-between' alignItems='center'>
                    {buttons}
                </Grid>
            </Grid>
            <Grid item xs={6} container direction='column' >
                <Grid item xs={8} container justifyContent="center" alignItems="center">
                    <RoboAvatar />
                </Grid>
                <Grid item xs={7}>
                    <CardSpread flipped={props.gameActive} ids={props.aiCards} />
                </Grid>
                <Grid item container justifyContent='center' color='white' xs={8}>
                    {aiStatus}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GameDisplay;