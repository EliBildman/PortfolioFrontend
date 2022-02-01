import { Box, Grid } from '@mui/material';
import { FC } from 'react';


const CenteredContent: FC = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }} pt={2}>
            <Grid container columns={24}>
                <Grid item xs={2} md={5} />
                <Grid item xs={20} md={14} /*sx={{backgroundColor: 'beige'}}*/ >
                    {props.children}
                </Grid>
                <Grid item xs={2} md={5} />
            </Grid>
        </Box>
    )
};

export default CenteredContent;