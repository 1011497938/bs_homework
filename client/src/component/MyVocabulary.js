import React, { Component } from 'react';
// import $ from 'jquery';

import { Button, Table, Divider, Segment, Grid, Image, Card, Header,Modal,Form} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import { observer } from 'mobx-react';

import myStateStore from '../store'
import 'whatwg-fetch'

@observer
class MyVocabulary extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "vocabularyName" : []
    }
  }

  render() {
    var showing = () => myStateStore.selectedV.name===""?<VocabularyList />:<WordTable name={myStateStore.selectedV.name}/>
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
      "vocabularyList" : []
    }
  }

  update(){
    //找到用户所有的生词本  
    var thisNode = this
    if(myStateStore.loginStatus.name!=='')
      fetch('/vocabularyList?owner='+myStateStore.loginStatus.name,{  
          method: 'GET',  
      })  
      // .then((response) => response.json())  
      .then((res) => {  
          if(res.ok){
              res.text().then((data)=>{
                  // console.log(data);
                  var json = JSON.parse(data); 
                  var vocabularyList = []
                  for(let index in json){
                    vocabularyList.push(json[index]['list'])
                  }
                  thisNode.setState({"vocabularyList":vocabularyList})
              })
          }
      })  
      .catch((error) => {  
          console.log(error) 
      })  
  }
  componentDidMount(){
    this.update()
  }

  render() {
    var renderVocabularyBlock = () => {
      var vocabularyList= this.state.vocabularyList
      var vocabularyBlockList = []
      for (var i = 0; i < vocabularyList.length; i+=2) {
        if (i+1<vocabularyList.length) {
          vocabularyBlockList.push(
            <Grid.Row key={i}>
              <Grid.Column>
                <VocabularyBlock name={vocabularyList[i]} update={this.update.bind(this)}/>
              </Grid.Column>
              <Grid.Column>
                <VocabularyBlock name={vocabularyList[i+1]} update={this.update.bind(this)}/>
              </Grid.Column>
            </Grid.Row>
          )
        }else{
          vocabularyBlockList.push(
            <Grid.Row key={i}>
              <Grid.Column>
                <VocabularyBlock name={vocabularyList[i]} update={this.update.bind(this)}/>
              </Grid.Column>
            </Grid.Row>
          )      
        }
      }
      return vocabularyBlockList;
    }

    return (
      <Segment padded>
        <AddV update={this.update.bind(this)}/>
        <Divider horizontal>单词本</Divider>
        <Grid columns={2} divided>
          {renderVocabularyBlock()}
        </Grid>
      </Segment>
    );
  }
}

// 添加生词本
class AddV  extends Component{
  render(){
    var submit = () => {
        if (this.refs.name.value!==''&&myStateStore.loginStatus.name!=='') {
          fetch('/vocabularyList/add?owner='+myStateStore.loginStatus.name+"&name="+this.refs.name.value,{  
              method: 'GET',  
          })  
          // .then((response) => response.json())  
          .then((res) => {  
              if(res.ok){
                  res.text().then((data)=>{
                    if (data=="success") {
                      alert("添加成功")
                      this.props.update();
                    }else
                      alert("添加失败")
                  })
              }
          })  
          .catch((error) => {  
              console.log(error) 
          }) 
        }
    }
    return (
      <Modal trigger={<Button>添加生词本</Button>}>
        <Modal.Header>登陆</Modal.Header>
        <Modal.Content image>
        <Form>
          <Form.Field>
            <label>生词本名</label>
            <input placeholder='生词本名' ref="name"/>
          </Form.Field>
          <Button type='submit' onClick={submit}>登陆</Button>
        </Form>
        </Modal.Content>
      </Modal>
    )
  }
}


class AddV  extends Component{
  render
}
class VocabularyBlock extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }


  enter = (e)=>{
    myStateStore.setSelectedV(this.props.name)
  }

  delete = (e)=>{
    console.log("删除")
    if (this.props.name!==''&&myStateStore.loginStatus.name!=='') {
      fetch('/vocabularyList/delete?owner='+myStateStore.loginStatus.name+"&name="+this.props.name,{  
          method: 'GET',  
      })  
      .then((res) => {  
          if(res.ok){
              res.text().then((data)=>{
                if (data=="success") {
                  this.props.update();
                }else
                  alert("删除失败")
              })
          }
      })  
      .catch((error) => {  
          console.log(error) 
      }) 
    }
  }

  render() {
    return (
      <Card>
        <Image src='http://localhost:3001/images/matthew.png' />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            {/*<span className='date'>Joined in 2015</span>*/}
          </Card.Meta>
          {/*<Card.Description>100个单词</Card.Description>*/}
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
      words:[]
    }
  }

  exit(){
    myStateStore.setSelectedV("")
  }


  componentDidMount(){
      //找到生词本所有单词
      var thisNode = this
      fetch('/vocabulary?listName='+this.props.name,{  
          method: 'GET',  
      })  
      // .then((response) => response.json())  
      .then((res) => {  
          if(res.ok){
              res.text().then((data)=>{
                  var json = JSON.parse(data); 
                  thisNode.setState({words:json})
                  myStateStore.setShowWordData(json)
              })
          }
      })  
      .catch((error) => {  
          console.log(error)  
      })  
  }

  render() {
    var renderTable = ()=>{
      // console.log(this.state.words)
      var row = (word,index) => (
        <Table.Row key={word.word+"_"+index}>
          <Table.Cell  textAlign='center'>{word.word}</Table.Cell>
          <Table.Cell  textAlign='left'>{word.meaning}</Table.Cell>
          <Table.Cell  textAlign='left'>
            <Button.Group>
              <Button className={word.word + '_' + word.list + '_del'}>del</Button>
              <Button.Or />
              <Button color='grey' className={word.word + '_' + word.list + '_add'}>addTo</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      )
      var table = [];
      var length = 0;
      if (this.state.words.length>=10) 
        length = 10
      else
        length = this.state.words.length

      for (var i = 0; i < length; i++) {
        table.push(row(this.state.words[i],i))
      }
      return table;
    }

    return (
      <Segment padded>
        <Header size='huge'>{this.props.name}</Header>
        <Button.Group widths='2'>
          <Button >开始背诵</Button>
          <Button color='grey' onClick={this.exit}>退出</Button>
        </Button.Group>
        <Divider />

        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>单词</Table.HeaderCell>
              {/*<Table.HeaderCell>发音</Table.HeaderCell>*/}
              <Table.HeaderCell>意思</Table.HeaderCell>
              <Table.HeaderCell>操作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {renderTable()}
          </Table.Body>
        </Table>

      </Segment>
    );
  }

}


export default MyVocabulary;