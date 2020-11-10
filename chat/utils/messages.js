const moment = require("moment");

const formatMessage=(username,text)=>{
    return{
        username: username,
        text: text,
        time: moment().format("MMMM Do YYYY, h:mm a"),
    }
};
module.exports = formatMessage;
