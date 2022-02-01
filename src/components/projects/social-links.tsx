import { Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FC } from 'react';


const SocialLinks: FC = () => {
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <IconButton href='https://github.com/EliBildman/' color='inherit'>
                    <GitHubIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton href='mailto:esbildman@gmail.com' color='inherit'>
                    <EmailIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton href='https://www.linkedin.com/in/eli-bildman-40b0b0157/' color='inherit'>
                    <LinkedInIcon fontSize='large' />
                </IconButton>

            </Grid>
            <Grid item>
                <IconButton href='https://www.instagram.com/eli.bildman/' color='inherit'>
                    <InstagramIcon fontSize='large' />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default SocialLinks;