import { Box, Typography } from '@mui/material';
import { FC } from 'react';


const ProjectsHeader: FC = () => {
    return (
        <Box>
            <Typography variant='h3'>
                Hello! My name is Eli.
            </Typography>
            <Typography variant='h6'>
                I’m a junior software engineer. This is a collection of some of my favorite projects, welcome!
            </Typography>
        </Box>
    )
}

export default ProjectsHeader;