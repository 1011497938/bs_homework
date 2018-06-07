import React, { Component } from 'react';
import $ from 'jquery';
class VocabularyList extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "vocabularyName" : []
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <dev style={{"width":600, "height":"100%", "position":"absolute", "right":"80px","backgroundColor":"white"}}>

      </dev>
    );
  }
}

export default VocabularyList;