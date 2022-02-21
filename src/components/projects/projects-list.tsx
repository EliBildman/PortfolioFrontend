import { FC } from 'react';
import { Grid } from '@mui/material';
import ProjectItem from './project-item';


const ProjectsList: FC = (props) => {

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item width='100%'>
                <Grid container direction='column' spacing={2}>
                    <ProjectItem
                        image_url='/images/betapokerlogo.png'
                        href='/projects/betapoker'
                        name='BetaPoker'
                        technologies={['CFR', 'Python']}
                        description= {`As my senior portfolio, I created a 2-player poker 
                        agent using CFR and some custom abstrctions. This demo is to test performance aginst humans.`}
                    />
                    <ProjectItem
                        image_url='/images/thecontroller.jpg'
                        href='/projects/controlserver'
                        name='ControlServer'
                        technologies={['Node.js']}
                        description= {`To control a number of IOT devices in my room (custom and not) 
                        I created this server. It works on an event-based model.`}
                    />
                </Grid>
            </Grid>

        </Grid>
    )
}

export default ProjectsList;