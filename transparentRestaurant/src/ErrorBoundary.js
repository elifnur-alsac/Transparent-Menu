import React, { Component } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import "./Error.css"


export class ErrorBoundary extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	render() {
		if (this.state.hasError) {
			return  <div className="error-msg">
            <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {this.props.errorMsg}
                    </Alert>
            </div>
		}
		return this.props.children
	}
}

export default ErrorBoundary