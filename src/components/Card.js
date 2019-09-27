import React, { Component } from 'react'
import './Index.css';
import TodoModal from './TodoModal'
import fire from './libs/Fire'
import CardItems from './CardItems' 
import { toast } from 'react-toastify';
import swal from 'sweetalert';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            status: [
                'inprogress',
                'completed'
            ],
            selectedStatus: 'todo', // Default Todo
            description: '',
            endDate: '',
            todos: [],
            isSubmitingTodo: false,
            isEdit: false,
            isLoading: true

        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmitTodo = () => {
        
        this.setState({ isSubmitingTodo: true })
        const {title, description, endDate, selectedStatus:status} = this.state
        fire.database().ref('todos').push(
            {
                title, 
                description, 
                endDate,
                status
            }
        )
        .then(() => {
            this.resetForm();
            this.setState({ showModal: false })
            toast.success('New Todo successfully add.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })
        .finally(() => {
            this.setState({ isSubmitingTodo: false })
        })
    }
    componentDidMount() {
        this.fetchTodoData();
    }
    fetchTodoData = () => {
        this.setState({ todos: [] });
        fire.database().ref('todos').on('child_added', snapchat => {
            const {title,status,description,endDate } = snapchat.val()
            this.setState( preState => ({
                todos: [ ...preState.todos,{
                        id: snapchat.key,
                            title,
                            status,
                            description,
                            endDate 
                        }
                    ],
                    isLoading:false
                })
            )
        })
    }
    todoDeleteHandler = (id, e) => {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fire.database().ref('todos').child(id ).remove()
                .then((res) => {
                    console.log(res);
                    this.fetchTodoData();
                    swal("Task has been deleted!", {
                        icon: "success",
                    });
                })
                .catch((err) => {
                    swal("Unable to delete this task!", {
                        icon: "error",
                    });
                })

            }
          });
    }
    todoEditHandler = (index, id, e) => {
        e.preventDefault();
        const { title, status:selectedStatus, endDate, description } = this.state.todos[index];
        this.setState({
            title,
            selectedStatus,
            endDate,
            description,
            showModal: true,
            isEdit:true,
            selectTodoId: id
        })
    }
    taskUpdateHandler = () => {
        this.setState({ isSubmitingTodo: true });
        const {title, description, endDate, selectedStatus:status} = this.state;
        fire.database().ref('todos').child(this.state.selectTodoId)
        .update({
            title, 
            description, 
            endDate, 
            status
        })
        .then(() => {
            this.resetForm();
            this.setState({
                showModal: false,
                isEdit: false
            });
            this.fetchTodoData();
            toast.success('Task has been successfully updatet.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.setState({ isSubmitingTodo: false })
        })
    }
    todoModalShowHandler = () => {
        this.setState({
            showModal: true
        })
    }
    todoModalHide = () => {
        this.setState({
            showModal: false
        })
    }
    resetForm = () => {
        this.setState({
            title: '', 
            description: '', 
            endDate: ''
        })
    }
    render() {
        if (this.state.isLoading) return  <div className="loader"></div> 
        const {title, description, endDate, selectedStatus, status, todos, isSubmitingTodo} = this.state;

        //  Filter() Using on Getting Firebase Data
        const newTodos = todos.filter((todo) => todo.status === 'todo')
        const inProgressTodos = todos.filter((todo) => todo.status === 'inprogress')
        const completedTodos = todos.filter((todo) => todo.status === 'completed')
        return (
            <React.Fragment>
                <div className="container-fluid pt-5">
                    <div className="row mb-3 mx-3">
                        <button 
                            type="button" 
                            className="btn btn-primary ml-auto" 
                            onClick={this.todoModalShowHandler}
                        >
                            Add New Todo
                        </button>
                    </div>
                    <TodoModal 
                        show={this.state.showModal}
                        onHide={this.todoModalHide}
                        isEdit={this.state.isEdit}
                        onChange={this.onChangeHandler}
                        onSubmit={this.onSubmitTodo}
                        updateHandler={this.taskUpdateHandler}
                        todo={{
                            title, 
                            description, 
                            endDate, 
                            selectedStatus, 
                            status,
                            isSubmitingTodo
                        }} 
                    />
                    <div className="row mx-3">  
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <h3 className="font-weight-bold text-dark">
                                Todo: [{newTodos.length}]
                            </h3>
                            <div className="todoOuter">
                                {
                                    newTodos.map((todo, i) => {
                                    return  <div key={i} className="card  todoIneerCard">
                                                <CardItems 
                                                    title={todo.title}
                                                    status= {todo.status}
                                                    endDate={todo.endDate}
                                                    description={todo.description}
                                                    editOnClick={(e) => {this.todoEditHandler(i, todo.id, e )}}
                                                    deleteOnClick={(e) => {this.todoDeleteHandler(todo.id, e )}}
                                                />
                                            </div>   
                                        }
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <h3 className="font-weight-bold text-dark ">
                                Inprogress: [{inProgressTodos.length}]
                            </h3>
                            <div className="inprogressOuter">
                                {
                                    inProgressTodos.map((todo, i) => {
                                    return  <div key={i} className="card  inprogressIneerCard">
                                                <CardItems 
                                                    title={todo.title}
                                                    status={todo.status}
                                                    endDate={todo.endDate}
                                                    description={todo.description}
                                                    editOnClick={(e) => {this.todoEditHandler(i, todo.id, e )}}
                                                    deleteOnClick={(e) => {this.todoDeleteHandler(todo.id, e )}}
                                                />
                                            </div>   
                                        }
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <h3 className="font-weight-bold text-dark">
                                Completed: [{completedTodos.length}]
                            </h3>
                            <div className="completedOuter">
                                {
                                    completedTodos.map((todo, i) => {
                                    return  <div key={i} className="card completedIneerCard">
                                                <CardItems 
                                                    title={todo.title}
                                                    status={todo.status}
                                                    endDate={todo.endDate}
                                                    description={todo.description}
                                                    editOnClick={(e) => {this.todoEditHandler(i, todo.id, e )}}
                                                    deleteOnClick={(e) => {this.todoDeleteHandler(todo.id, e )}}
                                                />
                                            </div>
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}