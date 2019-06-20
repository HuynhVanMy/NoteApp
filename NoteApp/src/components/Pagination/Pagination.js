import React, { Component } from 'react';
// import * as actions from './../../constants/ActionTypes';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1
        }
    }

    pagingation = totalPages => {
        let { pageIndex } = this.state;
        let pagins = []
        for (let i = 1; i <= totalPages; i++) {
            pagins.push(<a href='!#' onClick={(event) => this.handleOnclick(event, i)} className={pageIndex === i ? 'active' : ''}>{i}</a>);
        }
        return pagins;
    }

    handleOnclick = (event, pageIndex) => {
        let { totalPages } = this.props;
        event.preventDefault();
        if(pageIndex < 1) {
            pageIndex = 1;
        }

        if(pageIndex > totalPages) {
            pageIndex = totalPages;
        }

        this.props.setCurrentPage(pageIndex);
        this.props.paginPage(pageIndex);

        this.setState({
            pageIndex : pageIndex
        })
        
    }


    render() {

        let { totalPages } = this.props;
        let { pageIndex } = this.state;
        let pagins = this.pagingation(totalPages);

        return (
            <div className="pagination">
                <a href="!#" onClick={(event) => this.handleOnclick(event, 1)}>&laquo;</a>
                <a href="!#" onClick={(event) => this.handleOnclick(event, pageIndex - 1)}>&lsaquo;</a>
                {pagins.map((item, index) => {
                    return (
                        <span key={index}>{item}</span>
                    )
                })}
                <a href="!#" onClick={(event) => this.handleOnclick(event, pageIndex + 1)}>&rsaquo;</a>
                <a href="!#" onClick={(event) => this.handleOnclick(event, totalPages)}>&raquo;</a>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        paginPage : (pageIndex) => {
            dispatch(actions.paginPage(pageIndex));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);