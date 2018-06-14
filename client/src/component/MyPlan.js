import React, { Component } from 'react';
// import $ from 'jquery';

import { Button, Divider, Segment, Container, Header, Form, Dropdown, Rating,  List  } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';
import './css/NavBlock.css'

import { observer } from 'mobx-react';
import myStateStore from '../store'

@observer
class MyPlan extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "vocabularyName" : [],
      "length" : 0
    }
  }

  componentDidMount() {
      //找到用户所有的生词本  
      var thisNode = this
      fetch('/vocabularyList?owner='+'all',{  
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
                  thisNode.setState({"vocabularyName":vocabularyList})
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
		// vList[i]
	}

	var plan = myStateStore.plan
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
								一天{Math.ceil(1000/plan.days)}个单词<br/><br/>
							</p>
							<p>
								进度:
							</p>
							<Rating icon='star' defaultRating={4} maxRating={10} disabled/>
							<p>
								<br/><br/>
							</p>
						</Container>
						<List divided relaxed>
							<Header as='h5'>背诵记录：</Header>
							<List.Item>
								<List.Content>
									<List.Header as='a'>背诵100个单词</List.Header>
									<List.Description as='a'>2018/6/13</List.Description>
								</List.Content>
							</List.Item>
							<List.Item>
								<List.Content>
									<List.Header as='a'>背诵200个单词</List.Header>
									<List.Description as='a'>2018/6/18</List.Description>
								</List.Content>
							</List.Item>
							<List.Item>
								<List.Content>
									<List.Header as='a'>背诵120个单词</List.Header>
									<List.Description as='a'>2018/6/20</List.Description>
								</List.Content>
							</List.Item>
						</List>
					    <Button fluid>开始今天的计划</Button>
			      	</Segment>
  				):""
  		}
        <Segment padded>
          	<Divider horizontal>新的计划</Divider>
		  	<Form>
			    <Form.Group grouped>
					<Dropdown placeholder='选择单词本' fluid multiple selection options={options} />
					{/*<label>共4321个单词</label>*/}
					<Form.Field label='一天背诵' control='select'>
						<option value='100'>100个单词</option>
						<option value='150'>150个单词</option>
						<option value='200'>200个单词</option>
						<option value='250'>250个单词</option>
						<option value='500'>500个单词</option>
					</Form.Field>
					<Form.Field label='立志语' control='textarea' rows='3' />
			    </Form.Group>
		  	</Form>  
		    <Button fluid>开始新的计划</Button>
        </Segment>
      </div>
    );
  }
}

export default MyPlan;