import { Dispatch } from "redux"
import { appActions } from "app/app.reducer"
import { BaseResponseType } from "common/types/common.types"

/**
 * Функция для обработки ошибок приложения на сервере.
 *
 * @param {BaseResponseType<D>} data - Данные, полученные от сервера, содержащие сообщения об ошибках.
 * @param {Dispatch} dispatch - Функция dispatch из Redux для отправки действий.
 * @param {boolean} [isShowGlobalError=true] - Флаг, указывающий, отображать ли глобальное сообщение об ошибке или нет.
 * @returns {void}
 *
 * Эта функция используется для обработки ошибок приложения на сервере путем отправки соответствующих действий для установки сообщения об ошибке и статуса приложения.
 * Если `isShowGlobalError` равно true, будет отображено глобальное сообщение об ошибке, в противном случае будет установлен только статус приложения 'failed'.
 * Если массив `data.messages` не пустой, будет установлено сообщение об ошибке приложения, равное первому сообщению в массиве.
 * Если массив `data.messages` пустой, будет установлено сообщение об ошибке приложения по умолчанию 'Some error occurred'.
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
): void => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }))
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }))
    }
  }
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
