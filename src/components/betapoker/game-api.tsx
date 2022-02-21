
const apiUrl = 'http://localhost:5000';
const backendUrl = 'http://localhost:3005';

export interface GameInfo {
    board: string[],
    player_holes: string[][]
}

const doRequest = (url: string, callback: Function) => {
    const req = new XMLHttpRequest();
    
    req.addEventListener('load', () => {
        callback(JSON.parse(req.responseText));
    });

    req.open('GET', url);
    req.send();
};

export const getActor = (hist: string[], callback: Function) => {
    doRequest(`${apiUrl}/get-actor?hist=${hist.join('_')}`, callback);
};

export const getNature = (hist: string[], callback: Function) => {
    doRequest(`${apiUrl}/get-nature-action?hist=${hist.join('_')}`, callback);
};

export const getAvailableActions = (hist: string[], callback: Function) => {
    doRequest(`${apiUrl}/get-available-actions?hist=${hist.join('_')}`, callback);
};

export const getAIMove = (hist: string[], ai_player_no: number, callback: Function) => {
    const ai_player = ai_player_no === 0 ? 'p1' : 'p2';
    doRequest(`${apiUrl}/get-beta-action?hist=${hist.join('_')}&agent_player=${ai_player}`, callback);
};

export const isTerminal = (hist: string[], callback: Function) => {
    doRequest(`${apiUrl}/is-terminal?hist=${hist.join('_')}`, callback);
}

export const getBets = (hist: string[], callback: Function) => {
    doRequest(`${apiUrl}/get-bets?hist=${hist.join('_')}`, callback);
}

export const sendResults = (stack_diff: number, player_ip: string) => {
    fetch(`${backendUrl}/api/beta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            player_ip,
            stack_diff,
        })
    }).then(console.log, console.log)
}