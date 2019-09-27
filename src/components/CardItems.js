import React, { Component } from 'react'

export default class CardItems extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <React.Fragment>
                <h5 className="card-header font-weight-bolder">
                    {this.props.title}
                </h5>
                <div className="card-body text-center">
                    <p>
                        {this.props.status} <br/>
                        {this.props.description} <br/>
                        <span className="underline">{this.props.endDate}</span>
                    </p>
                </div>
                <div className="card-footer text-muted"> 
                    <div className="text-right">
                        <a href="true" className="mr-3">
                            <i 
                            className="fas fa-edit text-success"
                            onClick={this.props.editOnClick}
                            ></i>
                        </a>
                        <a href="true">
                            <i 
                                className="fas fa-trash-alt text-danger"
                                onClick={this.props.deleteOnClick}
                            ></i>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
