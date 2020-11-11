const users =[];

//add user to chat
const userAdd=(id,username,room)=>{
    const user = {id, username, room};
    users.push(user);
    return user
};

//get current user
const getCurrentUser=(id)=>{
    return users.find(user=>user.id===id)

};

//user leave out from chat
const userLeave=(id)=>{
    //find index return first element in the array that satisfy test, otherwise return -1
    const index = users.findIndex(user=>user.id===id);

    //can remove and add elements using splice
    //1 item at index place is remove

    if(index!==-1){
        return users.splice(index,1)[0]
    }

};

//get room users
const getRoomUser=(room)=>{
    return users.filter(user=>user.room===room)
}
module.exports = {
    userAdd,
    getCurrentUser,
    userLeave,
    getRoomUser
}
