import { FC, useState } from 'react';
import { Grid, Card, CardMedia, Typography, CardContent, ButtonBase } from '@mui/material';

interface ProjectItemProps {
    image_url: string,
    image_alt?: string,
    name: string,
    technologies: string[],
    description: string,
    href: string
}

const ProjectItem: FC<ProjectItemProps> = (props) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Grid item>
            <ButtonBase href={props.href} >
                <Card sx={{
                    width: '100%',
                    height: '250px',
                    outline: 'black solid 1px',
                    borderRadius: '0px',
                    backgroundColor: 'inherit',
                    boxShadow: 'none',
                    display: 'flex',
                }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            width: '50%',
                            flexShrink: 0,
                            minHeight: '100%',
                        }}
                        image={props.image_url}
                        alt={props.image_alt}
                    />
                    <CardContent>
                        <Typography component='div' variant='h5' sx={{ textDecoration: isHovered ? 'underline' : 'none' }}>
                            {props.name}
                        </Typography>
                        <Typography component='div' variant='subtitle1' >
                            {props.technologies.join(', ')}
                        </Typography>
                        <Typography component='div' variant='body1' display={{ xs: 'none', md: 'block' }} sx={{ textDecoration: isHovered ? 'underline' : 'none' }}>
                            {props.description}
                        </Typography>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    )
}

export default ProjectItem;