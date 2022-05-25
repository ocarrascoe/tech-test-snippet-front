import * as React from 'react';
import {Box, Button, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const card = (
  <React.Fragment>
    <CardContent style={{paddingLeft: 40, paddingRight: 40}}>
      <Typography sx={{fontSize: 30}} color="text.secondary" align="center" gutterBottom>
        Borrows
      </Typography>
      <Typography variant="body1" component="div">
        Al no ser una petición explícita de la prueba técnica el CRUD tanto de interfaz como en el backend se limitó
        únicamente a lo que fuera necesario para lo si solicitado para la prueba, por lo que esta sección es meramente
        informativa.
      </Typography>
      <br/>
      <Typography variant="body1" component="div">
        De igual manera se activó el administrador de Django, por lo que se puede hacer uso de este para interactruar
        a mayor nivel con esta entidad, para ello ingresar a <a href="http://localhost:8000/admin/borrow/borrow/"
                                                                target="_blank" rel="noreferrer">Administrador Django -
        Borrows</a> con el backend iniciado.
      </Typography>
      <Typography sx={{mt: 2, mb: 1.5}} variant="h6" color="text.secondary" align="center">
        Credenciales del administrador de Django
      </Typography>
      <Typography variant="body1" align="center">
        User: admin
        <br/>
        Password: admin
      </Typography>
      <Box sx={{mt: 5}}>
        <Grid container spacing={4} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Link href="https://www.linkedin.com/in/omar-carrasco-escudero-958a991a9/" underline="none" target="_blank"
                  rel="noreferrer">
              <Button variant="outlined" startIcon={<LinkedInIcon/>}>
                LinkedIn
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href="https://github.com/ocarrascoe/tech-test-snippet-front" underline="none" target="_blank"
                  rel="noreferrer">
              <Button variant="outlined" startIcon={<GitHubIcon/>} style={{marginRight: 10}}>
                Frontend
              </Button>
            </Link>
            <Link href="https://github.com/ocarrascoe/tech-test-snippet-back" underline="none" target="_blank"
                  rel="noreferrer">
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

export const InfoBorrows: React.FC = () => {

  return (
    <Box sx={{minWidth: 275}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
