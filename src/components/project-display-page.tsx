import { FC } from 'react';
import CenteredContent from './centered-content';
import { ButtonBase, Typography, Box, Grid } from '@mui/material';
import ProjectLinks from './project-display-links';

interface ProjectDisplayPageProps {
    name: string,
    gitLink: string,
}

const ProjectDisplayPage: FC<ProjectDisplayPageProps> = (props) => {
    return (
        <CenteredContent>
            <Grid container direction='row' justifyContent='space-between' mt={2} mb={1}>
                <Grid item>
                    <ButtonBase href='/projects'>
                        <Typography variant='h4'>{`< ${props.name}`}</Typography>
                    </ButtonBase>
                </Grid>
                <Grid item >
                    <ProjectLinks gitLink={props.gitLink} />
                </Grid>
            </Grid>
            {props.children}
        </CenteredContent>
    )
};

export default ProjectDisplayPage;