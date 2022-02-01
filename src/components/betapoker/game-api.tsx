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

export const getActor = (hist: string, callback: Function) => {
    doRequest(`http://localhost:5000/get-actor?hist=${hist}`, callback);
};

export const getNature = (hist: string, callback: Function) => {
    doRequest(`http://localhost:5000/get-nature-action?hist=${hist}`, callback);
};

export const getAvailableActions = (hist: string, callback: Function) => {
    doRequest(`http://localhost:5000/get-available-actions?hist=${hist}`, callback);
};

export const getAIMove = (hist: string, ai_player_no: number, callback: Function) => {
    const ai_player = ai_player_no === 0 ? 'p1' : 'p2';
    doRequest(`http://localhost:5000/get-beta-action?hist=${hist}&agent_player=${ai_player}`, callback);
};


export const isTerminal = (hist: string, callback: Function) => {
    doRequest(`http://localhost:5000/is-terminal?hist=${hist}`, callback);
}