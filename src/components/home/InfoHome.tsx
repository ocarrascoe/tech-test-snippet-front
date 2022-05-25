import * as React from 'react';
import {Box, Button, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const card = (
  <React.Fragment>
    <CardContent style={{paddingLeft: 40, paddingRight: 40}}>
      <Typography sx={{fontSize: 35}} color="text.secondary" align="center" gutterBottom>
        Prueba técnica Snippet
      </Typography>
      <Typography variant="body2" component="div">
        El presente proyecto se encuentra en su totalidad en inglés a excepción de estos cuadros explicativos (este, las
        secciones Borrows y Users). Estas secciones no eran solicitadas en la prueba, pero la base fue realizada para
        dar a entender el pensamiento de escalabilidad.
      </Typography>
      <br/>
      <Typography variant="body2" component="div">
        He utilizado Material UI, una template de Material UI y conocimiento adquirido de un <a
        href="https://www.udemy.com/course/nextjs-fh/" target="_blank"
        rel="noopener">curso de NextJS</a> que estoy realizando, si bien este proyecto no está construido con NextJS, al
        ser un framework de React es bastante fácil de adaptar lo aprendido. Todo está realizado con Typescript aunque
        no hay problema en trabajar en JavaScript si es necesario.
      </Typography>
      <br/>
      <Typography variant="body2" component="div">
        Cabe destacar que sé hacer uso de memo, useMemo y useCallback, contextos (en específico cree un contexto para la
        UI y finalmente no lo utilice) e incluso el uso de redux (normalmente hago uso del patró ducks para esto
        último), pero para este proyecto no fue realmente necesario, con las comunicaciones de padre a hijo y viceversa
        fue más que suficiente.
      </Typography>
      <Typography sx={{mt: 2, mb: 1.5}} variant="h6" color="text.secondary" align="center">
        Links Importantes
      </Typography>
      <Typography variant="body1" align="center">
        A continuación encontrarán links a mi LinkedIn y
        <br/>
        a los respectivos repositorios de los proyectos.
      </Typography>
      <Box sx={{mt: 5}}>
        <Grid container spacing={4} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Link href="https://www.linkedin.com/in/omar-carrasco-escudero-958a991a9/" underline="none" target="_blank"
                  rel="noopener">
              <Button variant="outlined" startIcon={<LinkedInIcon/>}>
                LinkedIn
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href="https://github.com/ocarrascoe/tech-test-snippet-front" underline="none" target="_blank"
                  rel="noopener">
              <Button variant="outlined" startIcon={<GitHubIcon/>} style={{marginRight: 10}}>
                Frontend
              </Button>
            </Link>
            <Link href="https://github.com/ocarrascoe/tech-test-snippet-back" underline="none" target="_blank"
                  rel="noopener">
              <Button variant="outlined" startIcon={<GitHubIcon/>} style={{marginLeft: 10}}>
                Backend
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </React.Fragment>
);

export const InfoHome: React.FC = () => {

  return (
    <Box sx={{minWidth: 275}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
