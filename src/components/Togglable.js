import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    const showWhenVisible = { display: visible ? '' : "none" }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}> {props.buttonLable}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>

    )

})

Togglable.propTypes = {
    buttonLable: PropTypes.string.isRequired
}

export default Togglable