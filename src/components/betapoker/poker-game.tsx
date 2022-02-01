import { FC, useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CardSpread from './card-spread';
import Card from './card';
import ActionButton from './action-button';
import RoboAvatar from './robo-avatar';
import { getActor, getNature, getAvailableActions, getAIMove, isTerminal, GameInfo } from './game-api';

const PokerGame: FC = () => {

    const [aiPlayerNo, setAiPlyaerNo] = useState<number>(0);

    const [playerCards, setPlayerCards] = useState<string[]>([]);
    const [aiCards, setAiCards] = useState<string[]>([]);
    const [commCards, setCommCards] = useState<string[]>([]);

    const [history, setHistory] = useState<string[]>([]);

    const [takingUserInput, setTakingUserInput] = useState<boolean>(false);
    const [legalActions, setLegalActions] = useState<string[]>([]);

    const takeUserInput = (move: string) => {
        console.log('user declares ' + move);
        const actCode = {'fold': 'F', 'call': 'C', 'raise': 'R'}[move];
        const userNum = 1 - aiPlayerNo;
        setHistory([...history, `P${userNum}-${actCode}`]);
    };

    useEffect(() => {

        const takeAIInput = (move: string) => {
            console.log('ai declares ' + move);
            const actCode = {'fold': 'F', 'call': 'C', 'raise': 'R'}[move];
            setHistory([...history, `P${aiPlayerNo}-${actCode}`]);
        };

        console.log(history)

        isTerminal(history.join('_'), (terminal: boolean) => {

            if(terminal) {
                console.log('game over');
            } else {
                getActor(history.join('_'), (actor: string) => {
                    if (actor === 'nature') {
                        getNature(history.join('_'), (cards: GameInfo) => {
                            console.log('nature deals');
                            console.log(cards);
                            if (history.length === 0) {
                                const p1_hole = cards.player_holes[0].join('')
                                const p2_hole = cards.player_holes[1].join('')
                                setHistory([`N-DP-${p1_hole}${p2_hole}`]);
                                if(aiPlayerNo === 0) {
                                    setAiCards(cards.player_holes[0]);
                                    setPlayerCards(cards.player_holes[1]);
                                } else {
                                    setPlayerCards(cards.player_holes[0]);
                                    setAiCards(cards.player_holes[1]);
                                }
                            } else {
                                const board: string = cards.board.filter(c => !(commCards.includes(c))).join('');
                                setHistory([...history, `N-DB-${board}`]);
                                setCommCards(cards.board);
                            }
                        });
                    } else if (actor === 'p1' || actor === 'p2') {
                        if (aiPlayerNo === ['p1', 'p2'].indexOf(actor)) { //kinda a sexy hack man
                            getAIMove(history.join('_'), aiPlayerNo, (move: string) => {
                                takeAIInput(move);
                            });
                        } else {
                            setTakingUserInput(true);
                            getAvailableActions(history.join('_'), setLegalActions);
                        }
                    }
                });
            }
        })
    }, [history, aiPlayerNo])

    const buttons = ['Fold', 'Call', 'Raise'].map((action) => {
        return (
            <ActionButton
                disabled={!takingUserInput || !legalActions.includes(action.toLowerCase())}
                action={() => takeUserInput(action.toLowerCase())}
                key={action}
            >
                {action}
            </ActionButton>
        )
    });

    return (
        <Box sx={{
            width: '100%',
            height: '400px',
            border: 'black solid 1px',
            backgroundColor: '#303030'
        }}>
            <Grid container direction='row' width='100%' height='100%'>
                <Grid item xs={6} container direction='column' >
                    <Grid item xs={8}/>
                    <Grid item xs={8}>
                        <CardSpread ids={playerCards}/>
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
                        { buttons }
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
        </Box>
    )
};

export default PokerGame;