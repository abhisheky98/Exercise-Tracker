import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogOut = () =>{
const {dispatch} = useAuthContext()
const {dispatch : workoutsDispatch} = useWorkoutsContext()

    const logout = () =>{
        //remove user from local storage
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS',payload:null})
    }

    return {logout}
}