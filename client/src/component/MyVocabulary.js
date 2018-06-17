import React, { Component } from 'react';
import $ from 'jquery';

import { Button, Table, Divider, Segment, Grid, Image, Card, Header,Modal,Form, Select} from 'semantic-ui-react'
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
    var showing = () => myStateStore.selectedV.name===""?<VocabularyList />:<WordTable name={myStateStore.selectedV.name} owner={myStateStore.selectedV.owner}/>
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
      "vocabularyList" : [],
      "userList" : []
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
                  var userList = []
                  for(let index in json){
                    // console.log(json[index])
                    vocabularyList.push(json[index]['list'])
                    userList.push(json[index]['user'])
                  }
                  // console.log(vocabularyList, userList)
                  thisNode.setState({"vocabularyList":vocabularyList})
                  thisNode.setState({"userList":userList})
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
      var userList= this.state.userList
      var vocabularyBlockList = []
      for (var i = 0; i < vocabularyList.length; i+=2) {
        if (i+1<vocabularyList.length) {
          vocabularyBlockList.push(
            <Grid.Row key={i}>
              <Grid.Column>
                <VocabularyBlock name={vocabularyList[i]} owner={userList[i]} update={this.update.bind(this)}/>
              </Grid.Column>
              <Grid.Column>
                <VocabularyBlock name={vocabularyList[i+1]} owner={userList[i+1]} update={this.update.bind(this)}/>
              </Grid.Column>
            </Grid.Row>
          )
        }else{
          vocabularyBlockList.push(
            <Grid.Row key={i}>
              <Grid.Column>
                <VocabularyBlock name={vocabularyList[i]} owner={userList[i]} update={this.update.bind(this)}/>
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


class VocabularyBlock extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }


  enter = (e)=>{
    myStateStore.setSelectedV(this.props.name, this.props.owner)
  }

  delete = (e)=>{
    // console.log("删除")
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
            {
              this.props.owner==='all'?(<div/>):
                <Button basic color='red'  id={this.props.name + "_delete"} onClick={this.delete}>
                  删除
                </Button>
            }
            <Button basic color='green' id={this.props.name + "_enter"} onClick={this.enter}>
              进入
            </Button>
          </div>
        </Card.Content>
      </Card>                
    );
  }
}


// 添加到单词本
class AddTo  extends Component{
  constructor(props){
    super(props)
    this.state = {
      "vocabularyList" : []
    }
  }
  componentDidMount(){
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
  render(){
    var submit = () => {
      var vocabulary =  $("#vocabularyList").val();
      // vocabulary/addTo?word=helloWorld&meaning=啥呀&vocabulary=test1&owner=100
      if(myStateStore.loginStatus.name!=='')
        fetch('vocabulary/addTo?word=' + this.props.word.word + '&meaning=' + this.props.word.meaning + '&vocabulary=' + vocabulary + '&owner=' + myStateStore.loginStatus.name,{  
            method: 'GET',  
        })  
        // .then((response) => response.json())  
        .then((res) => {  
            if(res.ok){
                res.text().then((data)=>{
                  if (data=='success') {
                    alert("添加成功")
                  }
                })
            }
        })  
        .catch((error) => {  
            console.log(error) 
        }) 
    }
    var renderList = ()=>{
      var optionList = []
      for (var i = 0; i < this.state.vocabularyList.length; i++) {
        optionList.push(<option value={this.state.vocabularyList[i]} key={i}>{this.state.vocabularyList[i]}</option>)
      }
      return optionList
    }
    return(
      <Modal trigger={<Button color='grey' >add to</Button>}>
        <Modal.Header>添加到单词本</Modal.Header>
        <Modal.Content image>
        <Form>
          <Form.Field label='选择单词本' control='select' id="vocabularyList">
            {
              renderList()
            }
          </Form.Field>
          <Button type='submit' onClick={submit}>登陆</Button>
        </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

class WordTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      words:[],
      update:false
    }
  }

  exit(){
    myStateStore.setSelectedV("")
  }

  start(){
    myStateStore.setShowWordData(this.state.words)
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
              })
          }
      })  
      .catch((error) => {  
          console.log(error)  
      })  
  }

  render() {
    var renderTable = ()=>{
      var del = {}
      for (var i = 0; i < this.state.words.length; i++) {
        let word = this.state.words[i]
        del[word.word] = ()=>{
          // console.log(word.word)
          // /vocabulary/delete?word=helloWorld&vocabulary=test1&owner=1
          if(myStateStore.loginStatus.name!=='')
            fetch('vocabulary/delete?word=' + word.word + '&vocabulary=' + this.props.name + '&owner=' + myStateStore.loginStatus.name,{  
                method: 'GET',  
            })  
            // .then((response) => response.json())  
            .then((res) => {  
                if(res.ok){
                    res.text().then((data)=>{
                      if (data!=='success') {
                        alert("删除失败")
                      }
                      this.setState({update:!this.state.update})
                      // console.log(this.state.update)
                    })
                }
            })  
            .catch((error) => {  
                console.log(error) 
            }) 
        }
      }

      var row = (word,index) => (
        <Table.Row key={word.word+"_"+index}>
          <Table.Cell  textAlign='center'>{word.word}</Table.Cell>
          <Table.Cell  textAlign='left'>{word.meaning}</Table.Cell>
          <Table.Cell  textAlign='left'>
            <Button.Group>
              <Button onClick={del[word.word]}>del</Button>
              <Button.Or />
              <AddTo word={word}/>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      )
      if (this.props.owner==='all')
        row = (word,index) => (
          <Table.Row key={word.word+"_"+index}>
            <Table.Cell  textAlign='center'>{word.word}</Table.Cell>
            <Table.Cell  textAlign='left'>{word.meaning}</Table.Cell>
            <Table.Cell  textAlign='left'>
              <Button.Group>
                <AddTo word={word}/>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )

      var table = [];
      for (var i = 0; i < this.state.words.length; i++)
        table.push(row(this.state.words[i],i))
      return table;
    }

    return (
      <Segment padded>
        <Header size='huge'>{this.props.name}</Header>
        <Button.Group widths='2'>
          <Button onClick={this.start.bind(this)}>开始背诵</Button>
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