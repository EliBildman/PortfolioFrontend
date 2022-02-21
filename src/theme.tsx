import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';

export const theme : Theme = createTheme({
    palette: {
        background: {
            // paper: '#000',
            default: '#D9D9D9',
        }
    },
    typography: {
        fontFamily: 'Andale Mono',
        subtitle1: {
            color: 'DimGray'
        },
        
    }
})