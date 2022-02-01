import { FC } from 'react';
import { Grid } from '@mui/material';
import ProjectsHeader from './projects-header';
import SocialLinks from './social-links';
import ProjectsList from './projects-list';
import CenteredContent from '../centered-content';


const ProjectsPage: FC = (props) => {

    return (
        <CenteredContent>
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item>
                    <ProjectsHeader />
                </Grid>
                <Grid item>
                    <SocialLinks />
                </Grid>
                <Grid item width='100%'>
                    <ProjectsList />
                </Grid>
            </Grid>
        </CenteredContent>
    )
}

export default ProjectsPage;