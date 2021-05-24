import React, { Component } from 'react'
import api from '../api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class TasksUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            rating: '',
            time: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleUpdateTask = async () => {
        const { id, name, rating, time } = this.state
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.updateTaskById(id, payload).then(res => {
            window.alert(`Task updated successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const task = await api.getTaskById(id)

        this.setState({
            name: task.data.data.name,
            rating: task.data.data.rating,
            time: task.data.data.time.join('/'),
        })
    }

    render() {
        const { name, rating, time } = this.state
        return (
            <Form>
            	<Form.Group controlId="formBasicEmail">
	                <h1>Create Task</h1>

	                <Form.Label>Name</Form.Label>
	                <Form.Control
	                	type="text"
	                	value={name}
	                	onChange={this.handleChangeInputName}
	                />

	                <Form.Label>Rating</Form.Label>
	                <Form.Control
	                    type="number"
	                    step="0.1"
	                    lang="en-US"
	                    min="0"
	                    max="10"
	                    pattern="[0-9]+([,\.][0-9]+)?"
	                    value={rating}
	                    onChange={this.handleChangeInputRating}
	                />

	                <Form.Label>Time</Form.Label>
	                <Form.Control
	                    type="text"
	                    value={time}
	                    onChange={this.handleChangeInputTime}
	                />

					<Button type="submit" variant="primary" onClick={this.handleUpdateTask}>Update Task</Button>
					<Button variant="danger" href={'/tasks/list'}>Cancel</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default TasksUpdate