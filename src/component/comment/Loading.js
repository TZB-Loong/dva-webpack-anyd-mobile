import React from 'react';
// import styles from './app.css';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';

const TIMER = 800;
let timeoutId = null;

class Loading extends React.Component {
    state = {
        show: false
    }

    componentWillMount() {
        const { loading } = this.props;
        if (loading) {
            timeoutId = setTimeout(() => {
                this.setState({
                    show: true
                });
            }, TIMER);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { loading } = nextProps;
        const { show } = this.state;

        this.setState({
            show: false
        });
        if (loading) {
            timeoutId = setTimeout(() => {
                this.setState({
                    show: true
                });
            }, TIMER);
        }
    }

    componentWillUnmount() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }

    render() {
        const { loading } = this.props;
        const { show } = this.state;
        return (
            <div className={this.props.className}>
                { this.props.children }
                <div >
                    <ActivityIndicator toast text="正在加载" animating={show && loading} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.loading.global && !state.loading.models.Verify
    }
};

export default connect(mapStateToProps)(Loading);