import { FC } from 'react';
import ProjectDisplayPage from '../project-display-page';
import PokerGame from './poker-game';
import BetaPokerWriteup from './betapoker-writeup';

const BetaPokerPage : FC = () => {

    return (
        <ProjectDisplayPage name='BetaPoker' gitLink='https://github.com/EliBildman/BetaPoker' >
            <PokerGame />
            <BetaPokerWriteup />
        </ProjectDisplayPage>
    )
};

export default BetaPokerPage;