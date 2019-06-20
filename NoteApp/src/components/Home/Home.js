import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Note from './../Note/Note';
import Add from './../Add/Add';
import { connect } from 'react-redux';
import * as api from '../../api/api';
import * as url from '../../api/url';
import Pagination from './../Pagination/Pagination';
import { NOTES_OF_PAGE } from './../../constants/ActionTypes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      notesInCurrentPage: [],
      totalPages: 1,
      currentPage: 1
    };
  }

  componentWillMount() {
    // api.get(url.GET).then(data => {
    //   this.setState({
    //     notes: data
    //   });
    // });
  }

  componentDidMount() {
    let { pageIndex } = this.props;
    this.getNotes(pageIndex);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(nextProps.pageIndex);
    this.getNotes(nextProps.pageIndex);
  }

  getNotes = (pageIndex) => {
    api.get(url.GET).then(data => {
      data = data ? data : [{
        title: "",
        content: ""
      }];

      this.setState({
        notes: data,
        totalPages: Math.ceil(data.length / NOTES_OF_PAGE)
      });

      this.setNotesInCurrentPage(data, pageIndex);
    });
  }

  setCurrentPage = pageIndex => {
    console.log(pageIndex);
    this.setState({
      currentPage: pageIndex
    })
  }

  setNotesInCurrentPage = (notes, pageIndex) => {
    let { notesInCurrentPage } = this.state;
    let startIndex = NOTES_OF_PAGE * (pageIndex - 1);
    let endIndex = pageIndex * NOTES_OF_PAGE;

    notesInCurrentPage = []

    if (notes.length >= NOTES_OF_PAGE) {
      if (startIndex > notes.length - NOTES_OF_PAGE) {
        for (let i = startIndex; i < notes.length; i++) {
          notesInCurrentPage.push(notes[i]);
        }
      } else {
        for (let i = startIndex; i < endIndex; i++) {
          notesInCurrentPage.push(notes[i]);
        }
      }
    }

    if (notes.length < NOTES_OF_PAGE) {
      for (let i = 0; i < notes.length; i++) {
        notesInCurrentPage.push(notes[i]);
      }
    }

    this.setState({
      notesInCurrentPage: notesInCurrentPage
    })
  }

  render() {
    console.log(typeof localStorage.getItem('token'));
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "undefined") {
      return <Redirect to='/login' />
    }

    let { totalPages, notesInCurrentPage } = this.state;

    var elementNote = "";
    if (notesInCurrentPage.length > 0) {
      console.log(notesInCurrentPage);
      elementNote = notesInCurrentPage.map((item, index) => {
        return <Note key={index} index={index} note={item} />;
      });
    }

    console.log("totalPages", totalPages);

    return (
      <div>
        <div className="main col-12 col-s-12">
          {elementNote}
          <Add />
        </div>
        {totalPages > 1 ? <Pagination totalPages={totalPages} setCurrentPage={this.setCurrentPage} /> : ""}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    pageIndex: state.pagin
  }
};

export default connect(mapStateToProps, null)(Home);