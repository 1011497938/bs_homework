import React, { Component } from 'react';
// import $ from 'jquery';

import { Button, Divider, Segment, Container, Header, Form, Dropdown, Rating,  List , Progress, Select, Modal, Icon, Image, Item} from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';
import './css/NavBlock.css'

import { observer } from 'mobx-react';
import myStateStore from '../store'
import $ from 'jquery';

@observer
class MyPlan extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "vocabularyName" : [],
      "length" : 0,
      "plan" : {
      	selectedVocabulary : "",
      	completion : "",
      	days : 0
      },
      "wordNum" : 0,
      "history" : []
    }
  }

  componentDidMount() {
      //找到用户所有的生词本  
      var thisNode = this
      fetch('/vocabularyList?owner='+myStateStore.loginStatus.name,{  
          method: 'GET',  
      })  
      .then((res) => {  
          if(res.ok){
              res.text().then((data)=>{
                  // console.log(data);
                  var json = JSON.parse(data); 
                  var vocabularyList = []
                  for(let index in json){
                    vocabularyList.push(json[index]['list'])
                  }
                  thisNode.setState({"vocabularyName":vocabularyList})
              })
          }
      })  
      .catch((error) => {  
          console.log(error) 
      }) 


      // 读取单词本的生词数
      fetch('/vocabulary/wordNum?owner=' + myStateStore.loginStatus.name + '&name=' + myStateStore.plan.V,{  
          method: 'GET',  
      })  
      .then((res) => {  
          if(res.ok){
              res.text().then((data)=>{
                  var wordNum = JSON.parse(data); 
                  thisNode.setState({"wordNum":wordNum.count})
              })
          }
      })  
      .catch((error) => {  
          console.log(error) 
      }) 

      // 读取历史资料
      fetch('/log?user='+myStateStore.loginStatus.name,{  
          method: 'GET',  
      })  
      .then((res) => {  
          if(res.ok){
              res.text().then((data)=>{
                  var json = JSON.parse(data); 
                  // console.log(json)
                  thisNode.state.history = json
              })
          }
      })  
      .catch((error) => {  
          console.log(error)  
      })  
  }

  render() {
	const options = []

	var vList = this.state.vocabularyName
	for (var i = 0; i < vList.length; i++) {
		options.push({ key: vList[i], text: vList[i], value: vList[i] })
	}

	var plan = myStateStore.plan

	// 开始完成计划
	var startMemorize = () => {
		var myDate = new Date();
		var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		var d = myDate.getDate();        //获取当前日(1-31)
		var m = myDate.getMonth()+1;
		console.log(y,d,m)

		var userName = myStateStore.loginStatus.name
		var date = y + "/" + m + "/" + d
		var num = Math.ceil(parseInt(this.state.wordNum)/plan.days)
		fetch('/log/add?user=' + userName + '&date=' + date + '&num=' + num,{  
		  	method: 'GET',  
		})  
		.then((res) => {  
		  	if(res.ok){
		      res.text().then((data)=>{
		          if (data != 'success') {
		          	console.log("日志写入失败")
		          }
		      })
		  }
		})  
		.catch((error) => {  
		  	console.log(error) 
		}) 

		//找到生词本所有单词
		var thisNode = this
		fetch('/vocabulary?listName='+myStateStore.plan.V,{  
		  method: 'GET',  
		})  
		// .then((response) => response.json())  
		.then((res) => {  
		  if(res.ok){
		      res.text().then((data)=>{
		        var json = JSON.parse(data);
						function shuffle(a) {
						   var len = a.length;
						   for(var i=0;i<len;i++){
						       var end = len - 1 ;
						       var index = (Math.random()*(end + 1)) >> 0;
						       var t = a[end];
						       a[end] = a[index];
						       a[index] = t;
						   }
						   return a;
						};
	          myStateStore.setShowWordData(shuffle(json))
	          console.log()
		      })
		  }
		})  
		.catch((error) => {  
		  console.log(error)  
		})  

	}

	var thisNode = this
	var update = () => {
		// http://localhost:3001/users/plan/update?name=hi&vocabulary=%E5%9B%9B%E7%BA%A7&days=10
		var selectV = $("#selectV").find('.text').eq(0).text()
		var num =  $("#num").val();
		//找到生词本所有单词
		var thisNode = this
		if (selectV!=="") 
			fetch('/users/plan/update?name=' + myStateStore.loginStatus.name + '&vocabulary=' + selectV + '&days=' + num,{  
			  method: 'GET',  
			})  
			// .then((response) => response.json())  
			.then((res) => {  
			  if(res.ok){
			      res.text().then((data)=>{
			      		if (data!=="success") 
			      			console.log("计划更新失败")
			      })
			  }
			})  
			.catch((error) => {  
			  console.log(error)  
			}) 
	}
	var renderHistory = () => {
		var historyList = []
		for (var i = 0; i < this.state.history.length; i++) {
			historyList.push(
				<List.Item key={i}>
					<List.Content>
						<List.Header as='a'>背诵{this.state.history[i].num}个单词</List.Header>
						<List.Description as='a'>{this.state.history[i].date}</List.Description>
					</List.Content>
				</List.Item>
			)
		}
		return historyList
	}
    return (
      <div style={{"width":800, "height":"100%", "position":"absolute", "right":"80px","backgroundColor":"white"}}>
  		{	
  			plan.V!=""?
  				(
			      	<Segment padded>
			      		<Divider horizontal>我的计划</Divider>
						<Container text>
							<p>
								{plan.V}<br/>
								一天{Math.ceil(parseInt(this.state.wordNum)/plan.days)}个单词<br/><br/>
							</p>
							<p>
								进度: {plan.completion+ "/" + plan.days + "天"}
							</p>
							<Progress percent={plan.completion/plan.days*100} />
							<p>
								<br/><br/>
							</p>
						</Container>
						<List divided relaxed>
							<Header as='h5'>背诵记录：</Header>
							{renderHistory()}
						</List>
							<div>
							    <Button fluid style={{margin:10}} onClick={startMemorize}>开始今天的计划</Button>
							    <Test owner={myStateStore.loginStatus.name} vocabulary={plan.V}/>
							    <Button style={{margin:10}} fluid onClick={startMemorize}>复习</Button>
					    	</div>
			      	</Segment>
  				):""
  		}
        <Segment padded>
          	<Divider horizontal>新的计划</Divider>
		  	<Form>
			    <Form.Group grouped>
			    	<Select placeholder='选择生词本' options={options} fluid id="selectV"/>
					<Form.Field label='几天背诵' control='select' id="num">
						<option value='3'>3天</option>
						<option value='10'>10天</option>
						<option value='20'>20天</option>
						<option value='100'>100天</option>
						<option value='150'>150天</option>
					</Form.Field>
					{/*<Form.Field label='立志语' control='textarea' rows='3' />*/}
			    </Form.Group>
		  	</Form>  
		    <Button fluid onClick={update}>开始新的计划</Button>
        </Segment>
      </div>
    );
  }
}

class Question extends Component {
	constructor(props){
		super(props)
		this.state = {
			showAnswer : false
		}
	}
	render(){
		var show = ()=>{
			this.setState({showAnswer:true})
		}
		return(
		    <Item>
		      <Item.Content>
		        <Item.Header as='a'>{this.props.word}</Item.Header>
		        <Item.Description>
				  <div>
				    <Button compact onClick={show}>{this.props.choice[0]}</Button>
				    <Button compact onClick={show}>{this.props.choice[1]}</Button>
				    <Button compact onClick={show}>{this.props.choice[2]}</Button>
				    <Button compact onClick={show}>{this.props.choice[3]}</Button>
				  </div>
		        </Item.Description>
		        <Item.Extra>答案：<div style={{color:"black"}}>{this.state.showAnswer?this.props.answer:""}</div></Item.Extra>
		      </Item.Content>
		    </Item>
		)
	}
}

// 复习
@observer
class Test extends  Component {  
   constructor(props){
    super(props)
    this.state = {
    	words : [],
    	score : 0
    }
  }
  componentDidMount(){
	//找到生词本所有单词
	var thisNode = this
	fetch('/vocabulary?listName='+this.props.vocabulary,{  
	  method: 'GET',  
	})  
	// .then((response) => response.json())  
	.then((res) => {  
	  if(res.ok){
	      res.text().then((data)=>{
	        var json = JSON.parse(data);
			function shuffle(a) {
			   var len = a.length;
			   for(var i=0;i<len;i++){
			       var end = len - 1 ;
			       var index = (Math.random()*(end + 1)) >> 0;
			       var t = a[end];
			       a[end] = a[index];
			       a[index] = t;
			   }
			   return a;
			};
			this.setState({words:shuffle(json)})
			// console.log(this.state.words)
	      })
	  }
	})  
	.catch((error) => {  
	  console.log(error)  
	})  
  }
  render(){
  	var renderQuestion = ()=>{
  		var words = this.state.words
  		var QuestionList = []
  		var end = words.length - 1 ;
  		for (var i = 0; i < words.length; i++) {
  			
  			var choice = []
  			for (var j = 0; j < 3; j++) {
  				var index = (Math.random()*(end + 1)) >> 0;
  				choice.push(words[index].meaning)
  			}
  			choice.push(words[i].meaning);
			function shuffle(a) {
			   var len = a.length;
			   for(var i=0;i<len;i++){
			       var end = len - 1 ;
			       var index = (Math.random()*(end + 1)) >> 0;
			       var t = a[end];
			       a[end] = a[index];
			       a[index] = t;
			   }
			   return a;
			};
  			QuestionList.push(<Question key={i} word={words[i].word} answer={words[i].meaning} choice={shuffle(choice)} />)
  		}
  		return QuestionList
  	}

  	return (
	  <Modal size="fullscreen" trigger={<Button fluid style={{margin:10}}>测试</Button>} fluid>
	    <Modal.Header>测试单词本({this.props.vocabulary})</Modal.Header>
	    <Modal.Content image scrolling>
	      <Modal.Description>
			  <Item.Group>
			    {renderQuestion()}
			  </Item.Group>
	      </Modal.Description>
	    </Modal.Content>
	    <Modal.Actions>
	    </Modal.Actions>
	  </Modal>
  	)
  }
}
export default MyPlan;