import { FC, useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import GameDisplay from './game-display';
import { getActor, getNature, getAvailableActions, getAIMove, isTerminal, getBets, GameInfo } from './game-api';

const PokerGame: FC = () => {

    const [aiPlayerNo, setAiPlayerNo] = useState<number>(0);

    const [playerCards, setPlayerCards] = useState<string[]>([]);
    const [aiCards, setAiCards] = useState<string[]>([]);
    const [commCards, setCommCards] = useState<string[]>([]);

    const [history, setHistory] = useState<string[]>([]);

    const [takingUserInput, setTakingUserInput] = useState<boolean>(false);
    const [legalUserActions, setLegalUserActions] = useState<string[]>([]);

    const [gameActive, setGameActive] = useState<boolean>(false);

    const [bets, setBets] = useState<number[]>([0, 0]);
    const [takes, setTakes] = useState<number[]>([0, 0]);

    const takeUserInput = (move: string) => {
        console.log('user declares ' + move);
        setTakingUserInput(false);
        const actCode = {'fold': 'F', 'call': 'C', 'raise': 'R'}[move];
        const userNum = 1 - aiPlayerNo;
        setHistory([...history, `P${userNum}-${actCode}`]);
    };

    const takeAIInput = (move: string) => {
        console.log('ai declares ' + move);
        const actCode = {'fold': 'F', 'call': 'C', 'raise': 'R'}[move];
        setHistory([...history, `P${aiPlayerNo}-${actCode}`]);
    };

    const resetGame = () => {
        setPlayerCards([]);
        setAiCards([]);
        setCommCards([]);
        setHistory([]);
        setTakingUserInput(false);
        setLegalUserActions([]);
        setAiPlayerNo((Math.random() > 0.5 ? 0 : 1)); //why is there no built in randint
        setGameActive(true);
        setBets([0, 0]);
        setTakes([0, 0]);
    }

    useEffect(() => {
        console.log(history)
        if (gameActive) {
            isTerminal(history, (termInfo: [boolean, number[]]) => {
                if(termInfo[0]) {
                    const takes = aiPlayerNo === 1 ? termInfo[1] : termInfo[1].reverse()
                    setTakes(takes);
                    setGameActive(false);
                    console.log('game over, takes: ' + termInfo[1]);
                } else {
                    getActor(history, (actor: string) => {
                        if (actor === 'nature') {
                            getNature(history, (cards: GameInfo) => {
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
                                getAIMove(history, aiPlayerNo, takeAIInput);
                            } else {
                                setTakingUserInput(true);
                                getAvailableActions(history, setLegalUserActions);
                            }
                        }
                    });
                    getBets(history, (bets: number[]) => {
                        bets = aiPlayerNo === 1 ? bets : bets.reverse();
                        setBets(bets);
                    })
                }
            })
        }
    }, [history, aiPlayerNo, gameActive]);

    return (
        <Box sx={{
            width: '100%',
            height: '400px',
            border: 'black solid 1px',
            backgroundColor: '#303030'
        }}>
            <GameDisplay
                playerCards={playerCards}
                aiCards={aiCards}
                commCards={commCards}
                takingUserInput={takingUserInput} 
                legalUserActions={legalUserActions}
                aiPlayerNo={aiPlayerNo}
                gameActive={gameActive}
                userInputCallback={takeUserInput}
                startCallback={resetGame}
                bets={bets}
                takes={takes}
            />
        </Box>
    )
};

export default PokerGame;