import React, { Component } from 'react';
// import $ from 'jquery';

import { Button, Icon,Menu,Table, Divider, Segment, Container, Header, Grid, Image, Card, Label, Form, Dropdown, Rating,  List  } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';
import './css/NavBlock.css'

class NavBlock extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "vocabularyName" : []
    }
  }

  componentDidMount() {

  }

  render() {
	const options = [
	  { key: 'angular', text: 'Angular', value: 'angular' },
	  { key: 'css', text: 'CSS', value: 'css' },
	  { key: 'design', text: 'Graphic Design', value: 'design' },
	  { key: 'ember', text: 'Ember', value: 'ember' },
	  { key: 'html', text: 'HTML', value: 'html' },
	  { key: 'ia', text: 'Information Architecture', value: 'ia' },
	  { key: 'javascript', text: 'Javascript', value: 'javascript' },
	  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
	  { key: 'meteor', text: 'Meteor', value: 'meteor' },
	  { key: 'node', text: 'NodeJS', value: 'node' },
	  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
	  { key: 'python', text: 'Python', value: 'python' },
	  { key: 'rails', text: 'Rails', value: 'rails' },
	  { key: 'react', text: 'React', value: 'react' },
	  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
	  { key: 'ruby', text: 'Ruby', value: 'ruby' },
	  { key: 'ui', text: 'UI Design', value: 'ui' },
	  { key: 'ux', text: 'User Experience', value: 'ux' },
	]


    return (
      <div style={{"width":800, "height":"100%", "position":"absolute", "right":"80px","backgroundColor":"white"}}>
      	<Segment padded>
      		<Divider horizontal>我的计划</Divider>
			<Container text>
				<p>
					六级词汇 四级词汇<br/>
					一天300个单词<br/><br/>
				</p>
				<p>
					总体评分:
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
						<List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
						<List.Description as='a'>Updated 10 mins ago</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Content>
						<List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
						<List.Description as='a'>Updated 22 mins ago</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Content>
						<List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
						<List.Description as='a'>Updated 34 mins ago</List.Description>
					</List.Content>
				</List.Item>
			</List>
		    <Button fluid>开始今天的计划</Button>
      	</Segment>

        <Segment padded>
          	<Divider horizontal>新的计划</Divider>
		  	<Form>
			    <Form.Group grouped>
					<Dropdown placeholder='选择单词本' fluid multiple selection options={options} />
					<label>共6666个单词</label>
					<Form.Field label='一天背诵' control='select'>
						<option value='male'>100个单词</option>
						<option value='female'>150个单词</option>
						<option value='female'>200个单词</option>
						<option value='female'>250个单词</option>
						<option value='female'>500个单词</option>
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

export default NavBlock;