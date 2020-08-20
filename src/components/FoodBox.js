import React, { Component } from 'react'

export default class FoodBox extends Component {

    myRef = React.createRef()


    render() {

        const {name, calories, image} = this.props.food

        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={image} />
                    </figure>
                    </div>
                    <div className="media-content">
                    <div className="content">
                        <p>
                        <strong>{name}</strong> <br />
                        <small>{calories} cal</small>
                        </p>
                    </div>
                    </div>
                    <div className="media-right">
                    <div className="field has-addons">
                        <div className="control">
                        <input ref={this.myRef} className="input" type="number" 
                        defaultValue="1" />
                        </div>
                        <div className="control">
                        <button onClick={() => this.props.onAdd(this.myRef , this.props.id)} className="button is-info">
                            +
                        </button>
                        </div>
                    </div>
                    </div>
                </article>
            </div>
        )
    }
}
