import { FC } from 'react';
import CenteredContent from './centered-content';
import { ButtonBase, Typography, Box } from '@mui/material';

interface ProjectDisplayPageProps {
    name: string
}

const ProjectDisplayPage: FC<ProjectDisplayPageProps> = (props) => {
    return (
        <CenteredContent>
            <Box width='100%' mt={2} mb={4}>
                <ButtonBase href='/projects'>
                    <Typography variant='h4'>{`< ${props.name}`}</Typography>
                </ButtonBase>
            </Box>
            {props.children}
        </CenteredContent>
    )
};

export default ProjectDisplayPage;