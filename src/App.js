// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import './App.css';
import stand from './stand.png'
import climb from './climb.png'

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            to_do_list: [],
            done_list: [],
            showGuy: false,
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input in not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,
            };

            // Update list
            const to_do_list = [...this.state.to_do_list];
            to_do_list.push(userInput);

            // reset state
            this.setState({
                to_do_list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const to_do_list = [...this.state.to_do_list];

        // Filter values and leave value which we need to delete
        const updateList = to_do_list.filter((item) => item.id !== key);

        // Update to_do_list in state
        this.setState({
            to_do_list: updateList,
        });
    }
    // Function to delete item from done list use id to delete
    deleteDoneItem(key) {
        const done_list = [...this.state.done_list];

        // Filter values and leave value which we need to delete
        const updateList = done_list.filter((item) => item.id !== key);

        // Update to_do_list in state
        this.setState({
            done_list: updateList,
        });
    }
    // Function to delete item from list use id to delete
    completeItem(key) {
        const to_do_list = [...this.state.to_do_list];
        const done_list = [...this.state.done_list];

        // Filter values and leave value which we need to delete
        const key_value = to_do_list.find((item) => item.id === key);
        
        // Update list
        done_list.push(key_value);

        const updateList = to_do_list.filter((item) => item.id !== key);
        // Update to_do_list in state
        this.setState({
            to_do_list: updateList,
            done_list: done_list,
        });
    }

    stepGuy() {
        this.setState({ showGuy: true }); // Show the guy

        // Hide the guy after 2 seconds
        setTimeout(() => {
            this.setState({ showGuy: false });
        }, 1000);
    }   
    
    render() {
        return (
            <Container>
                <Row  className="todo-title" >
                    the never-ending to-do list:
                </Row>

                <Row>
                    <Col md={5} className="mx-auto">

                        <div className="todo-input">
                            <FormControl
                                className="custom-textbox"
                                placeholder="write down what you need to do today . . . "
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                                <Button
                                    className="my_button"
                                    onClick={() => this.addItem()}
                                >
                                    add task
                                </Button>
                        </div>
                    </Col>
                </Row>
                <div className="my_container">
                    <div className="list-group">
                        {this.state.done_list.map((item, index) => (
                            <div className="ladder-item-done" key={index}>
                                <div className="ladder-content">
                                    <span className="item-text">{item.value}</span>
                                    <Button
                                        className="my_button"
                                        onClick={() => this.deleteDoneItem(item.id)}>
                                        delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {this.state.done_list.length === 0 ? (
                            <img src={stand} alt="" className="pic-unsticky" />
                        ) : (
                                <img src={stand} alt="" className="pic-sticky" />
                        )}     
                        {this.state.showGuy ? (
                                    <img src={climb} alt="Character" className="pic-sticky" />
                                ) : null}
                        {this.state.to_do_list.map((item, index) => (
                            <div className="ladder-item" key={index}>
                                <div className="ladder-content">
                                    <Button 
                                        className="check_button"
                                        onClick={() => {
                                            this.completeItem(item.id);
                                            // this.stepGuy();
                                        }}>
                                        ✓
                                    </Button>
                                    <span className="item-text">{item.value}</span>
                                    <Button
                                        className="my_button"
                                        onClick={() => this.deleteItem(item.id)}>
                                        delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="sticky-bottom">
                        </div>
                    </div>
                </div>

            </Container>
        );
    }
}

export default App; // This is required for default import to work
