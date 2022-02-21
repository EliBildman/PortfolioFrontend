import { Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { FC } from 'react';

interface ProjectLinksProps {
    gitLink: string,
}

const ProjectLinks: FC<ProjectLinksProps> = (props) => {
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <IconButton href={props.gitLink} color='inherit'>
                    <GitHubIcon fontSize='large' />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default ProjectLinks;