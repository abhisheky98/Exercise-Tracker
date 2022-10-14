import * as React from 'react';
import { useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatRelative from 'date-fns/formatRelative';



    
    

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])

    
const handleClick = async() =>{

    if (!user){
        setError("must be logged in")
        return
    }
    const response = await fetch('/api/workouts/'+workout._id,{
        method:'DELETE',
        headers:{
            'Authorization' : `Bearer ${user.token}`
        }

    })


    const json = await response.json()
    if (response.ok){
        dispatch({type:'DELETE_WORKOUT',payload:json})
        
    }
}




const handleClickupdate = async (e) => {

    e.preventDefault()
    if (!user){
        setError("must be logged in")
        return
    }
    if (!title || !weight || !reps) {
        setError("Please fill all fields");
        return;
      }
    setError(false)
    const updatedFields = {title: title, weight: weight, reps: reps}

   
    const response = await fetch('/api/workouts/'+workout._id,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${user.token}`

        },
        body: JSON.stringify(updatedFields)
    })

    const json = await response.json()
    if (response.ok){
        dispatch({type:'UPDATE_WORKOUT',payload:json})
    }
    else {
        console.error(json)
    }
    
    setOpen(false);   
}













const [deleteOpen, setDeleteOpen] = React.useState(false);

const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };


const [open, setOpen] = React.useState(false);
  
const handleClickUpdateOpen = () => {
    setOpen(true);
};



const handleClose = () => {

    setOpen(false);
    setDeleteOpen(false);

};
  


    return(
        
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p ><strong>Weight (lbs):</strong>&nbsp;&nbsp;&nbsp;<strong>{workout.weight}</strong></p>
            <p><strong>Repetitons:</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{workout.reps}</strong></p>
            <div style={{ position: "absolute", top: 70, right: 30 }}>
            <p style={{ textAlign: "right" }}>
                {formatRelative(new Date(workout.createdAt), new Date(), { addSuffix: true })}
            </p>
            </div>


            <div>
                <Button className='delete_button' onClick={handleClickDeleteOpen}>delete</Button>
                <Dialog open={deleteOpen} onClose = {handleClose}>
                    <DialogTitle>Delete workout</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this workout?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClick}>Delete</Button>
                        </DialogActions>
                        

                </Dialog>
            
            </div>
            
            
            <div className="temp">
            <Button className='update_button' onClick={handleClickUpdateOpen}>update</Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Workout</DialogTitle>
          <DialogContent>
            
            <label>Workout Name:</label> 
            <input 
                type="text" 
                onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value === '') {
                      setEmptyFields((prevState) => [...prevState, 'title']);
                    } else {
                      setEmptyFields((prevState) => prevState.filter(field => field !== 'title'));
                    }
                  }} 
                value={title}
                className ={emptyFields.includes('title') ? 'error':''}
                required
            />
            <label>weight (lbs):</label>
            <input 
                type="number" 
                onChange={(e) => setWeight(e.target.value)} 
                value={weight}
                className ={emptyFields.includes('weight') ? 'error':''}
                required
            />

            <label>Number of Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)} 
                value={reps} 
                className ={emptyFields.includes('reps') ? 'error':''}
                required
            />
            
            {error && <p>{error}</p>}
            
            
           

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClickupdate}>update</Button>
          </DialogActions>
        </Dialog>
            </div>
            
        </div>
    )

}
export default WorkoutDetails