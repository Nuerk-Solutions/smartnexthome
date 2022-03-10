import React, {Component} from 'react'
import ErrorComponent from '../../components/error/ErrorComponent';

export default class ErrorBoundaryContainer extends Component {
    state = {
        hasError: false,
        eventId: null,
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        this.setState({error})
    }

    render() {
        return (
            <div>
                {this.state.hasError ? (
                    <div className="flex">
                        <div className="w-1/6"/>
                        <div className="flex-col w-2/3 justify-center text-center">
                            <ErrorComponent
                                errorMessage={'Etwas ist schief gelaufen. Seite aktualisieren!'}
                            />
                        </div>
                    </div>
                ) : (
                    this.props.children
                )}
            </div>
        )
    }
}
