import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import { Login } from "features/auth/Login"
import "./App.css"
import { TodolistsList } from "features/TodolistsList/TodolistsList"
import { ErrorSnackbar } from "common/components"
import { selectIsLoggedIn } from "features/auth/auth.selectors"
import { selectAppStatus, selectIsInitialized } from "app/app.selectors"
import { useActions } from "common/hooks/useActions"

function App() {
  const status = useSelector(selectAppStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  // const dispatch = useAppDispatch()
  // применяя хук избавляемся от dispatch
  // const { initializeApp, logout } = useActions(authThunks)
  // в хук useActions также можно обернуть не только санку, но и экшон, например:
  // const { setAppStatus } = useActions(appActions)
  // Рефактор синтаксиса useActions
  const { initializeApp, logout } = useActions()

  useEffect(() => {
    // dispatch(authThunks.initializeApp())
    initializeApp()
  }, [])

  const logoutHandler = useCallback(() => {
    // dispatch(authThunks.logout())
    logout()
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
