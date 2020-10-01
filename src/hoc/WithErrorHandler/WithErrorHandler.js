import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

function WithErrorHandler(WrappedComponent, AxiosInstance) {
  return class extends Component {
    state = {
      error: null,
    }

    componentWillMount = () => {
      this.reqInterceptor = AxiosInstance.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = AxiosInstance.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount = () => {
      AxiosInstance.interceptors.request.eject(this.reqInterceptor);
      AxiosInstance.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return <>
        <Modal
          show={this.state.error}
          clicked={this.errorConfirmedHandler}>
          {this.state.error ? this.state.error.message : null}
        </Modal>
        <WrappedComponent {...this.props} />
      </>
    }
  }
}

export default WithErrorHandler;