export const patchListReq = async (list, user, editListForm) =>{
    const response = await fetch(`http://localhost:5555/api/lists/${list._id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editListForm)
    })

    return response
}

export const deleteListReq = async (list, user) =>{
    const response = await fetch(`http://localhost:5555/api/lists/${list._id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })

    return response
}

export const fetchListReq = async (user) => {

    const response = await fetch(`http://localhost:5555/api/lists/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
}