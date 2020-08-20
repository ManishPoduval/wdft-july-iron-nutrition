import React from 'react'

export default function Search(props) {

    return (
        <div>
            <input onChange={props.onChange} placeholder="Search for a food"></input>
        </div>
    )
}
