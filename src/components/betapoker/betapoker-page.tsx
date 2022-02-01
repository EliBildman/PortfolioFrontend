import { FC } from 'react';
import ProjectDisplayPage from '../project-display-page';
import PokerGame from './poker-game';

const BetaPokerPage : FC = () => {

    return (
        <ProjectDisplayPage name='BetaPoker'>
            <PokerGame />
        </ProjectDisplayPage>
    )
};

export default BetaPokerPage;