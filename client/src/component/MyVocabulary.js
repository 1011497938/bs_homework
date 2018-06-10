import React, { Component } from 'react';
// import $ from 'jquery';

import { Button, Icon,Menu,Table, Divider, Segment, Grid, Image, Card, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import { observer } from 'mobx-react';

import myStateStore from '../store'


@observer
class MyVocabulary extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "vocabularyName" : []
    }
  }

  componentDidMount() {

  }

  render() {
    var showing = () => myStateStore.selectedV.name==""?<VocabularyList />:<WordTable name={myStateStore.selectedV.name}/>
    return (
      <div style={{"width":800, "height":"100%", "position":"absolute", "right":"80px","backgroundColor":"white", "overflow":"scroll"}}>
        {showing()}
      </div>
    );
  }
}


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
      <Segment padded>
        <Divider horizontal>常用单词本</Divider>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <VocabularyBlock name="四级"/>
            </Grid.Column>
            <Grid.Column>
              <VocabularyBlock name="六级"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}


class VocabularyBlock extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  enter = (e)=>{
    // console.log(this.props.name)
    myStateStore.setSelectedV(this.props.name)
  }

  delete = (e)=>{
    console.log(this.props.name)
  }

  render() {
    return (
      <Card>
        <Image src='http://localhost:3001/images/matthew.png' />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>100个单词</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' id={this.props.name + "_enter"} onClick={this.enter}>
              进入
            </Button>
            <Button basic color='red'  id={this.props.name + "_delete"} onClick={this.delete}>
              删除
            </Button>
          </div>
        </Card.Content>
      </Card>                
    );
  }
}


class WordTable extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  exit(){
    myStateStore.setSelectedV("")
  }
  render() {
    return (
      <Segment padded>
        <Header size='huge'>{this.props.name}</Header>
        <Button.Group widths='2'>
          <Button >开始背诵</Button>
          <Button color='grey' onClick={this.exit}>退出</Button>
        </Button.Group>
        <Divider />

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>单词</Table.HeaderCell>
              <Table.HeaderCell>发音</Table.HeaderCell>
              <Table.HeaderCell>意思</Table.HeaderCell>
              <Table.HeaderCell>操作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='center'>Cell</Table.Cell>
              <Table.Cell  textAlign='center'>Cell</Table.Cell>
              <Table.Cell  textAlign='center'>Cell</Table.Cell>
              <Table.Cell  textAlign='center'>
                <Button.Group>
                  <Button>del</Button>
                  <Button.Or />
                  <Button color='grey'>add</Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }

}


export default MyVocabulary;