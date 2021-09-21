import { Brightness4, Brightness7 } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  AppBar,
  Box,
  Button,
  CircularProgress,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import React, { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';
import { DropzoneInputProps, FileWithPath, useDropzone } from 'react-dropzone';
import { themeModeAtom, useRecoilState } from './state';

const Upload = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles: FileWithPath[], fileRejections) {
      for (const rejection of fileRejections) {
        for (const error of rejection.errors) {
          console.error(error);
        }
      }
      window.app.dropFiles(acceptedFiles.map((x) => x.path));
    },
  });

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: isDragActive && 'text.secondary',
      }}
      {...getRootProps()}
    >
      <input
        {...getInputProps({ webkitdirectory: 'true' } as DropzoneInputProps)}
      />
      <p>{isDragActive ? 'Drop here' : 'Drag here'}</p>
    </Box>
  );
};

export default function App() {
  const [themeMode, setThemeMode] = useRecoilState(themeModeAtom);
  const theme = useMemo(
    () => createTheme({ palette: { mode: themeMode } }),
    [themeMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="fixed">
          <Toolbar>
            <h3>Uploader</h3>
            <Box sx={{ flex: 1 }} />
            {themeMode === 'light' ? (
              <IconButton color="inherit" onClick={() => setThemeMode('dark')}>
                <Brightness4 />
              </IconButton>
            ) : (
              <IconButton color="inherit" onClick={() => setThemeMode('light')}>
                <Brightness7 />
              </IconButton>
            )}
            <Suspense
              fallback={
                <CircularProgress sx={{ ml: 1 }} size={25} color="inherit" />
              }
            >
              {/* <CurrentAuthenticatedUser /> */}
            </Suspense>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flex: 1,
          }}
        >
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => {
              return (
                <Box sx={{ alignSelf: 'center' }}>
                  <Alert
                    severity="error"
                    action={
                      <Button onClick={() => resetErrorBoundary()}>
                        Retry
                      </Button>
                    }
                  >
                    <AlertTitle>An error has occured</AlertTitle>
                    {error.toString()}
                  </Alert>
                </Box>
              );
            }}
          >
            <Suspense fallback={<CircularProgress />}>
              <Router>
                <Switch>
                  <Route path="/" component={Upload} />
                </Switch>
              </Router>
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
