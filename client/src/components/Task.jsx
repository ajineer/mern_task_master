import { Box, Button, Checkbox, ListItem, Paper, TextField, Typography } from "@mui/material"
import { deleteTaskReq, patchTaskReq } from "../routes/taskRoutes"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"
import { useEffect, useState } from "react"
import { green, red } from "../styles/colors"

const Task = ({index, task}) => {
    
    const {user} = useAuthContext()
    const {lists, dispatch} = useListContext()
    const [edit, setEdit] = useState(false)
    const [editTaskForm, setEditTaskForm] = useState({
        name: '',
        status: false
    })

    useEffect(() => {
        setEditTaskForm({...task})
    },[ task])

    const handleDelete = async (e) => {
        const response = await deleteTaskReq(task, user)
        const json = await response.json()
        if(response.ok){
            //updatedList = { ...lists[index], tasks: lists[index].tasks.filter(t => t._id !== task._id)}
            const updatedList = lists[index]
            updatedList.tasks.filter(t => t._id !== task._id)
            dispatch({type: 'UPDATE_LIST', payload: updatedList})
        }
    }

    const handleEdit = async (e) => {
        
        e.preventDefault()
        const response = await patchTaskReq(e, task, user)
        const json = await response.json()
        lists[index].tasks?.map(t => {
            return t._id === task._id ? json : t
        })
        if(response.ok){
            setEditTaskForm({...json})
            dispatch({type: 'UPDATE_LIST', payload: lists[index]})
            setEdit(false)
        }
    }

    return (

        <ListItem sx={{display: 'flex', width: '100%'}}>
            <Paper sx={{display: 'flex', justifyContent: 'space-between', borderLeft: `${editTaskForm.status ? green : red} solid 4px`, width: '100%'}}>
                {edit?
                <form onSubmit={(e) => handleEdit(e)}>
                    <input required name='name' onKeyDown={(e) => {if(e.key === 'Escape'){setEdit(false)}}} placeholder={editTaskForm.name} type="text" onChange={(e) => setEditTaskForm({name: e.target.value})}></input>
                </form>
                :
                <Typography sx={{margin: 'auto 0 auto 1rem'}} onClick={() => setEdit(true)} variant="span">
                    {editTaskForm.name}
                </Typography>}
                <Box sx={{display: 'flex'}}>
                    <Button onClick={(e) => handleDelete(e)}>X</Button>
                    <Checkbox checked={editTaskForm.status} onChange={(e) => handleEdit(e)}/>
                </Box>
            </Paper>
        </ListItem>
    )
}

export default Task