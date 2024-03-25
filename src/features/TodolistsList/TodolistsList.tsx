import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { FilterValuesType } from "features/TodolistsList/todolists.reducer"
import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolist } from "./Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "features/auth/auth.selectors"
import { selectTasks } from "features/TodolistsList/tasks.selectors"
import { selectTodolists } from "features/TodolistsList/todolists.selectors"
import { TaskStatuses } from "common/enums"
import { useActions } from "common/hooks/useActions"

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  // const dispatch = useAppDispatch();
  /*  const { removeTodolist, addTodolist, fetchTodolists, changeTodolistTitle } = useActions(todolistsThunks)
    const { addTask, removeTask, updateTask } = useActions(tasksThunks)
    const { changeTodolistFilter } = useActions(todolistsActions)*/
  // Рефактор синтаксиса useActions
  const {
    removeTodolist,
    addTodolist,
    fetchTodolists,
    changeTodolistTitle,
    addTask,
    removeTask,
    updateTask,
    changeTodolistFilter,
  } = useActions()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolists()
  }, [])

  const removeTaskCallBask = useCallback(function (taskId: string, todolistId: string) {
    removeTask({ taskId, todolistId })
  }, [])

  const addTaskCallBask = useCallback(function (title: string, todolistId: string) {
    addTask({ title, todolistId })
  }, [])

  const changeStatusCallBask = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    updateTask({ taskId, domainModel: { status }, todolistId })
  }, [])

  const changeTaskTitleCallBask = useCallback(function (taskId: string, title: string, todolistId: string) {
    updateTask({ taskId, domainModel: { title }, todolistId })
  }, [])

  const changeFilterCallBask = useCallback(function (filter: FilterValuesType, id: string) {
    changeTodolistFilter({ id, filter })
  }, [])

  const removeTodolistCallBask = useCallback(function (id: string) {
    removeTodolist(id)
  }, [])

  const changeTodolistTitleCallBask = useCallback(function (id: string, title: string) {
    changeTodolistTitle({ id, title })
  }, [])

  const addTodolistCallBask = useCallback((title: string) => {
    addTodolist(title)
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallBask} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCallBask}
                  changeFilter={changeFilterCallBask}
                  addTask={addTaskCallBask}
                  changeTaskStatus={changeStatusCallBask}
                  removeTodolist={removeTodolistCallBask}
                  changeTaskTitle={changeTaskTitleCallBask}
                  changeTodolistTitle={changeTodolistTitleCallBask}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
