import React, { Component } from 'react'
import logo from './logo.svg';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import './App.css';
import FoodBox from './components/FoodBox'
import CreateForm from './components/CreateForm';
import Search from './components/Search';

export default class App extends Component {

  state = {
    foodList: foods,
    filteredList: foods,
    showForm: false,
    todaysFood: { }
  }

  handleSearch = (e) => {
      let searchText = e.currentTarget.value
      let filteredItems = this.state.foodList.filter((food) => {
          return food.name.toLowerCase().includes(searchText.toLowerCase())
      })
      this.setState({
        filteredList: filteredItems
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {name, calories, image} = e.currentTarget
    let newItem = {
      name: name.value,
      calories: calories.value,
      image: image.value,
      quantity: 0
    }

    let cloneFoodList = [...this.state.foodList]
    cloneFoodList.unshift(newItem)
    this.setState({
      showForm: false,
      foodList: cloneFoodList,
    })
  }

  showForm = () => {
    this.setState({
      showForm: true,
    })
  }

  handleAdd = (ref, index) => {
    let quantity = ref.current.value
    let cloneArr = JSON.parse(JSON.stringify(this.state.filteredList))
    cloneArr[index].quantity = Number(quantity)

    const clonedTodaysFood = JSON.parse(JSON.stringify(this.state.todaysFood));
    let itemName = cloneArr[index].name
    if (itemName in clonedTodaysFood){
      clonedTodaysFood[itemName].quantity += Number(quantity)
    }
    else {
      clonedTodaysFood[itemName]  = cloneArr[index]
    }
    console.log(clonedTodaysFood)
    this.setState({
      filteredList: cloneArr,
      todaysFood: clonedTodaysFood
    })

  }  
  

  render() {

    let totalCalories =  Object.keys(this.state.todaysFood).reduce((acc, foodName) => {
        let item = this.state.todaysFood[foodName]
        return acc + (item.calories * item.quantity)
    }, 0)

    return (
      <div class="columns">
        <div class="column">
          <div>
            {
              this.state.showForm ? <CreateForm onSubmit={this.handleSubmit} /> : <button onClick={this.showForm}>Add Item</button>
            }
            <Search onChange={this.handleSearch}/>
            {
              this.state.filteredList.map((food, index) => {
                return <FoodBox onAdd={this.handleAdd} food={food} id={index}/>
              })
            }
          </div>
        </div>
        <div class="column">
            <h1>Today's foods</h1>
            <ul>
              {
                Object.keys(this.state.todaysFood).map((foodName) => {
                  let item = this.state.todaysFood[foodName]

                  return (
                  <li>{item.quantity} {item.name} = {item.quantity * item.calories} cal</li>
                  )
                })
              }
            </ul>
            <h5>Total:{totalCalories}  cal</h5>
        </div>
      </div>
     
    )
  }
}
