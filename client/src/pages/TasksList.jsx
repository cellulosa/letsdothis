import React, { Component } from 'react'
import api from '../api'
import { ListGroup, Tab, Form, Button } from 'react-bootstrap';

class UpdateTask extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/tasks/update/${this.props.id}`
    }

    render() {
        return <Button type="submit" variant="primary" onClick={this.updateUser}>Update</Button>
    }
}

class DeleteTask extends Component {
    deleteTask = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the task ${this.props.id} permanently?`,
            )
        ) {
            api.deleteTaskById(this.props.id)
            window.location.reload()
        }
    }

    render() {
		return <Button variant="danger" onClick={this.deleteTask}>Cancel</Button>
    }
}

class TasksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllTasks().then(tasks => {
            this.setState({
                tasks: tasks.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { tasks, isLoading } = this.state
        console.log('TCL: TasksList -> render -> tasks', tasks)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteTask id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateTask id={props.original._id} />
                        </span>
                    )
                },
            },
        ]


        return (
        	<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        		<ListGroup>
        			<ListGroup.Item action href="#link1">Tasks</ListGroup.Item>
        		</ListGroup>

        		<Tab.Content className="mt-3">
        			<Tab.Pane eventKey="#link1">
        				<ListGroup variant="flush">
        					{tasks.map((task) => (
								<ListGroup.Item className="modal-bg">{task.name}</ListGroup.Item>
							))}
        				</ListGroup>
        			</Tab.Pane>
        		</Tab.Content>
        	</Tab.Container>
        )
    }
}

export default TasksList