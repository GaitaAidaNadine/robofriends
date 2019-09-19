import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {

    constructor(){
        super()
        this.state= {
            loading: false,
            robots: [],
            searchField: ''
        }
    }

    //fetching data from an (fake) API -> as in a real life app
    componentDidMount(){
        console.log('didMount');
        this.setState({loading: true});
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            this.setState({ 
                robots: users,
                loading: false
            });
        })

    }

    onSearchChange = ( event ) => {
        this.setState({ searchField: event.target.value })
    }


    render(){
        console.log('render');
        const { robots, searchField, loading } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField);
        })

        return loading ?
        <h1 className='tc pa7'>Loading...</h1> :
        (    
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={ filteredRobots }/>
                    </Scroll>
                    
            </div>    
        );    

    }
}

export default App;