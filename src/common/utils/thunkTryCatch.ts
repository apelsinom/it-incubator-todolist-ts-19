import { AppDispatch, AppRootStateType } from "app/store"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/app.reducer"
import { BaseResponseType } from "common/types"
/**
 * Функция-обёртка для обработки ошибок в асинхронных действиях.
 *
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>} thunkAPI - Объект thunkAPI, содержащий dispatch, getState и extraArgument.
 * @param {() => Promise<T>} logic - Функция, содержащая логику асинхронного действия.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - Возвращает результат выполнения функции logic в случае успеха или результат вызова rejectWithValue в случае ошибки.
 *
 * Эта функция используется для обработки ошибок в асинхронных действиях. Она устанавливает статус приложения 'loading' перед выполнением логики, обрабатывает ошибки с помощью функции handleServerNetworkError и устанавливает статус приложения 'idle' после выполнения логики.
 */
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }))
  }
}
