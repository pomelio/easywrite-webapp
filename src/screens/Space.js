// @flow

import React from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getSpace} from '../reducers';
import {fetchArticles,  initSpace, fetchSpaceByHost, fetchSpace} from '../Actions';
import {WEB_ROOT} from '../Constants';


import SmallImage from './components/SmallImage';
import {log, LOG_ENABLED} from '../Logger';

class Space extends React.Component {
	constructor(props) {
		super(props);

		LOG_ENABLED && log('Space:constructor->props:');
	}
	
	componentDidMount() {
		LOG_ENABLED && log('Space:componentDidMount');
		this._isMounted = true;
		this._init();
	}

	componentWillUnmount() {
		LOG_ENABLED && log('Space:componentWillUnmount');
		this._isMounted = false;
	}

	renderArticle = (article) => {
		let {history} = this.props;
		if (article.deleteTime > 0) {
			return null;
		}

		let space = this.props.spaceNode.space;
		
		let part = article.parts[0];
		
		if (!part.photos) {
				part.photos = [];
		}
		
		let photos = part.photos.map(photo => {
			return (
				<SmallImage key={photo.id} style={{margin: 15}} photoID={photo.id}/>
			);
		});
		
		let contentEle = <p dangerouslySetInnerHTML={{__html: part.content}}/>

		let partEle = (
			<div className={'flex-left flex-wrap'} key={part.id}>
				<div className={'unit-2-3 unit-1-on-mobile'}>{photos}</div>
				<div className={'unit-1-3 unit-1-on-mobile'}>{contentEle}</div>
			</div>
		);
		
		return (
			<div className="container-wider" key={article.id} id='space' style={{marginTop:15, backgroundColor: '#fff'}} onClick={
				(event) => {
					event.preventDefault();
					history.push('/1/web/article/' + article.id);
				}
			}>
				<h4>{article.title}</h4>
				<div>{partEle}</div>
			</div>
		);
	}

	render() {
		LOG_ENABLED && log('Space:render');
		let spaceNode = this.props.spaceNode;
		let space = spaceNode.space;

		let spacePictureURL = '/static/images/spacehead.jpeg';
    	if (space && space.pictureID) {
			spacePictureURL = WEB_ROOT + '/1/photo/' + space.pictureID + '?resize=800'
		}
		
		let spaceHeadEle = (
			<div className="container-wider" style={{backgroundImage: 'url(' + spacePictureURL + ')', height:'80px',  width:'80px'}}></div>
		);
		let moreEle = null;
		if (!spaceNode.noMore) {
			moreEle = <button type='button' className='btn btn-primary' onClick={
				event => {
					event.preventDefault();
					this._next();
				}
			} >{'more...'}</button>;
		}
		
		let articlesEle = spaceNode.articles.map(article => this.renderArticle(article));
		return (
			<div className="container-wider" style={{backgroundColor:'#f2f2f2'}}>
				{spaceHeadEle}
				{articlesEle}
				{moreEle}
			</div>
		);
				
	}

	_init = () => {
		let {match} = this.props;
		let spaceID = match.params.spaceID;
		let spaceNode = this.props.spaceNode;
		let space = spaceNode.space;
		if (space) {
			this.props.initSpace(space);
		} else {
			if (spaceID) {
				this.props.fetchSpace(spaceID);
			} else {
				this.props.fetchSpaceByHost();
			}
		}

	}

	_next = () => {
		let spaceNode = this.props.spaceNode;
		let space = spaceNode.space;
		let articles = spaceNode.articles;
		return this.props.fetchArticles(space.id, articles.length);
	}

}


const mapStateToProps = state => ({
	spaceNode: getSpace(state),
});


export default withRouter(connect(
	mapStateToProps,
	{ fetchArticles,  initSpace, fetchSpaceByHost, fetchSpace }
  )(Space))
