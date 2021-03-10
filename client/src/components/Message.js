import React from 'react'

export const Message = (props) => {
    const bgColor = props.options.status === 'pos' ? '#4CAF50' : '#F44336'

    return (
        <p style={{
            backgroundColor: bgColor,
            color: '#FFF',
            padding: '10px 40px',
            margin: '0 -40px 20px',
            display: props.options.text ? 'block' : 'none',
        }}>
            {props.options.text}
        </p>
    )
}