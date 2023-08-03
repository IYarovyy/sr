import './App.css'
import { AppBar, Box, Toolbar } from '@mui/material';
import { paths } from './routes';
import { Route, Switch } from 'react-router-dom';
import Auth from '@pages/Auth';
import SoundCheck from '@pages/SoundCheck';
import ProfileMenu from '@components/ProfileMenu'
import { AuthProvider } from '@contexts/index';
import { PrivateRoute } from "@components/PrivateRoute"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  // palette: {
  //   mode: "dark",
  // },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Box display="flex" justifyContent="flex-end" width="100%">
                <ProfileMenu />
              </Box>
            </Toolbar>
          </AppBar>

          <Box width={500} m="auto" mt={2}>
            <Switch>
              {/* <Route path={paths.main} exact>
                <Auth/>
              </Route> */}
              <PrivateRoute path={paths.main} exact>
                <SoundCheck />
              </PrivateRoute>
              <PrivateRoute path={paths.soundcheck} exact>
                <SoundCheck />
              </PrivateRoute>
              <Route path={paths.auth} exact>
                <Auth />
              </Route>
            </Switch>
          </Box>
        </div>
      </ AuthProvider>
    </ThemeProvider>
  );
}

export default App;
