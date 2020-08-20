import React from 'react'

export default function CreateForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <input name="name" type="text" placeholder="Enter name"></input>
            <input name="calories" type="number" placeholder="Enter calories"></input>
            <input name="image" type="text" placeholder="Enter image url"></input>
            <button type="submit">Submit</button>       
        </form>
    )
}
