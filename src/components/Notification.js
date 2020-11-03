import React from 'react'

const Notification = ({ message }) => {

    const notificationstyle = {
        color: 'blue',
        background: 'lightgray',
        fontsize: 20,
        borderradius:'solid',
        borderradius: 5,
        padding: 10,
        marginbottom: '10px'

    }

    if (!message) {
        return null
    }
    return (
        <div style={notificationstyle}>
            {message}
        </div>
    )


}


export default Notification
