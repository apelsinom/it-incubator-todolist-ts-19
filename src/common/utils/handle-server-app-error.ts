import { Dispatch } from "redux"
import { appActions } from "app/app.reducer"
import { BaseResponseType } from "common/types/common.types"

/**
 * handleServerAppError
 * @param data
 * @param dispatch
 * @param isShowGlobalError
 * @return ничего (void)
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
