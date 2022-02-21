import { FC } from 'react';
import { Typography, Box, Grid, ButtonBase, Link } from '@mui/material';
import { CodeBlock, dracula } from 'react-code-blocks';

const BetaPokerWriteup: FC = () => {

    const cf_value_code_no_sub = "\
def cf_value(node, sub_action=None):\n\
    #recursively get EV of node to every possible term, adjusted for transition probs\n\
        return prob_history(node) * expected_value(node)\n\n\
    for child in node.get_children():\n\
        if child.last_action == sub_action:\n\
            # *1 here is symbolic to represent this is the subbed strat where this action is always taken\n\
            return prob_history(node) * 1.0 * expected_value(child)"

    const cf_value_code = "\
def cf_value(node):\n\
    #recursively get EV of node to every possible term, adjusted for transition probs\n\
    return prob_history(node) * expected_value(node)"

    const cf_regret_code = "\
def cf_regret_node(node, action):\n\
    return cf_value(node, sub_action=action) - cf_value(node)"

    const cf_regret_iset_code = "\
def cf_regret_iset(iset, action):\n\
    r = 0\n\
    for node in iset.get_nodes():\n\
        r += cf_regret_node(node, action)\n\
    return r"

    return (
        <Box>
            <Typography variant='h4'>
                What is this?
            </Typography>
            <Typography paragraph variant='h6'>
                This is my implementation of a reinforcement-learning-based poker agent. The name is a play on Deepmind's Go agent AlphaGo.
            </Typography>
            <Grid container direction='row' justifyContent='space-evenly' alignItems='center' width='100%'>
                <Grid item xs={8}>
                    <img src='/images/betapokerlogo_trans.png' width='100%' alt='beta poker logo'/>
                </Grid>
                <Grid item xs={8}> 
                    <ButtonBase href='https://deepmind.com/research/case-studies/alphago-the-story-so-far' disableRipple={true}>
                        <img src='/images/Alphago_logo_Reversed.svg' width='100%' alt='alpha go logo'/>
                    </ButtonBase>
                </Grid>
            </Grid>
            <Typography paragraph>
                The training algorithm I used is called counterfactual regret minimization, or CFR, which is the base algorithm for pretty much all state-of-the-art poker automation. Given it's functionality, it's is incredibly simple in concept. I'll give an outline in this writeup, and you can read further in my manuscript and in the real publications.
            </Typography>
                <Grid container item direction='column' marginBottom={2}>
                    <Link color='#000' align='center' href='/files/thesis_final.pdf'>
                        My Manuscript
                    </Link>
                    <Link color='#000' align='center' href='http://modelai.gettysburg.edu/2013/cfr/cfr.pdf'>
                        A more in depth CFR explaination   
                    </Link>
                    <Link color='#000' align='center' href='https://poker.cs.ualberta.ca/publications/Burch_Neil_E_201712_PhD.pdf'>
                        Neil Burch's 'Time and Space' with CFR and variaions
                    </Link>
                </Grid>
            <Typography paragraph>
                Unsurprisingly, CFR is the iterative process of minimizing regret. Regret can be thought of as the loss in value of our agent's strategy given a specific state of the hidden variables in a game. In the case of poker, this is the state of the hole cards your opponents are holding.
            </Typography >
            <Typography paragraph>
                A 'strategy' in poker is a probability distribution over a player's available moves, e.g. "fold 50% of the time, call 50% of the time". In games of 'imperfect information' player's can't create strategies for every state of the game since some states look identical, as they're differentiated by hidden information. In poker these are the states differentiated by your opponent's hole cards. In analysis, we call these identical-states-from-the-player's-perspective "information sets." Each information set gets a strategy, creating one "strategy profile."
            </Typography>
            <Grid container direction='row' justifyContent='space-evenly' alignItems='center' width='100%'>
                <Grid item xs={12}>
                    <img src='/images/coinflip.png' width='100%' alt='coinflip game diagram'/>
                </Grid>
            </Grid>
            <Typography paragraph> 
                This figure describes a simple imperfect information coin-flip game I lay out in my manuscript. The details aren't super important, but it tries to show how two different states with different payoffs can be connected in an information set (the dotted line connects the two states in the set). Player two can only have one strategy for both these positions.
            </Typography>
            <Typography paragraph> 
                In CFR, counterfactual regret is first calculated for a move at a specific position, e.g. "fold when I'm holding the Ace of Spades and the Ace of Clubs and my opponent is holding a 2 of Diamonds and a 2 of Clubs preflop". It's important to remember that the player's strategy for this position is blind to the opponents hole cards, and would be the same no matter what their hole was, but the regret is calculated for the specific position, including the hidden information. The agent calculates the counterfactual value of its strategy profile in this position. Counterfactual value is just the expected value of the position (given the random events to come and current strategies) adjusted for the probability of being in a position to begin with. It's expressed in this code.
            </Typography>
            <CodeBlock 
                text={cf_value_code_no_sub}
                language='python'
                showLineNumbers={false}
                theme={dracula}
            />
            <Typography paragraph mt={1}> 
                The agent then considers counterfactual value in this position with a slightly altered strategy profile where it would always make this move in this position, e.g. "fold 100% of the time, call 0% of the time." The function with this addition looks like this.
            </Typography>
            <CodeBlock 
                text={cf_value_code}
                language='python'
                showLineNumbers={false}
                theme={dracula}
            />
            <Typography paragraph mt={1}> 
                Counterfactual regret for this move as the difference between the counterfactual value of the position with the altered strategy and with the true one.
            </Typography>
            <CodeBlock 
                text={cf_regret_code}
                language='python'
                showLineNumbers={false}
                theme={dracula}
            />
            <Typography paragraph mt={1}> 
                A positive regret indicates that this move should be taken more often, a negative regret indicates the opposite. Regret is calculated for each move at the position, then summed over the information set. The sums are added to running totals, which are then normalized to create a strategy proportional to the regret. This process iteratively finds an optimal strategy profile.
            </Typography>
            <CodeBlock 
                text={cf_regret_iset_code}
                language='python'
                showLineNumbers={false}
                theme={dracula}
            />
            <Typography paragraph mt={1}> 
                This implementation is pretty rudimentary and is just a starting point for my development. I'm logging the results of this demo to get an idea of how the agent performs against human players.
            </Typography>
        </Box>
    )
};

export default BetaPokerWriteup;