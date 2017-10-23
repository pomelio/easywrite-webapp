import React from 'react';
import '../App.css';


import { connect } from 'react-redux';
import { withRouter } from 'react-router';


import { initSpace, fetchSpace, initArticle, fetchArticle } from '../Actions';
import { getSpace, getArticle} from '../reducers';

import SmallImage from './components/SmallImage';
import {log, LOG_ENABLED} from '../Logger';

import {
	WEB_ROOT,
} from '../Constants';

const moment = require('moment');

function selectSpace(history, space) {
	if (history.length > 1) {
		history.goBack();
		return;
	}
	
	if (space) {
		if (space.host) {
			history.replace('/');
		} else {
			history.replace('/1/web/space/' + space.id);
		}
	} else {
		history.replace('/1/web/space/' + space.id);
	}
}

class Article extends React.Component {
	constructor(props) {
		super(props);
		
		LOG_ENABLED && log('Article:constructor->props:');
	}

	componentDidMount() {
		LOG_ENABLED && log('Article:componentDidMount');
		this._isMounted = true;
		this._init();
	}

	componentWillUnmount () {
		LOG_ENABLED && log('Article:componentWillUnmount');
		this._isMounted = false;
	}
  
  	render() {
		let {spaceNode, articleNode, history} = this.props;
    	LOG_ENABLED && log('Article:render');
		let article = articleNode.article;
		if (!article) {
			return null;
		}
		let elapsed = moment(article.createTime).fromNow();
		let parts = this.props.articleNode.parts;
		
    	let space = spaceNode.space;
    	let name = space.name;

    	let spacePictureURL = '/static/images/spacehead60.jpeg';
    	if (space && space.pictureID) {
			spacePictureURL = WEB_ROOT + '/1/photo/' + space.pictureID + '?resize=60X60';
		}

		let partsEle = parts.map(part => {
			if (!part.photoIDList) {
				part.photoIDList = [];
			}
			let photoListEle = part.photos.map(photo => {
				let photoID = photo.id;
				let title  = null;
				if (photo.title) {
					title = <p class="text-small">{photo.title}</p>;
				}
				return (
					<p className={['flex-center','flex-vertical'].join(' ')} key={photoID} >
						<SmallImage  photoID={photoID} width="big" />
						{title}
					</p>
				);
			});
			
			return (
				<div key={part.id}>
					<p dangerouslySetInnerHTML={{__html: part.content}}/>
         			{photoListEle}
				</div>
			);

		});


		return (
			<div className="container-wider" id='article'>
				<div className="flex-middle"><span style={{marginTop:30, marginRight: 30}} onClick={event => {
					event.preventDefault();
					let space = spaceNode.space;
            		selectSpace(history, space);
        		}}><img src={'/images/back.svg'} alt="back" /></span><h4 style={{display: 'inline-block'}}>{article.title}</h4></div>
          		<div className='flex-left flex-middle top-gap' onClick={ event => {
            			event.preventDefault();
            			let space = spaceNode.space;
						selectSpace(history, space);
            		}
          		}>
            		<div className='unit-0'><img alt={'article'} src={spacePictureURL}/></div>
            		<div className='unit' style={{marginLeft:16}}>
              			<div className='text-small'>{name}</div>
              			<address className='text-small'>{elapsed}</address>
            		</div>
          		</div>
          		{partsEle}
				<div className="flex-center top-gap-big">
                	<span className="text-danger text-small">【易写】App</span>
            	</div>
      		</div>
    	);
	}

	_init = () => {
    	//let match = this.context.match();
    	let {match, spaceNode} = this.props;
		let articleID = match.params.articleID;
		let space = spaceNode.space;
		let articles = spaceNode.articles;
    	if (space && articles && articles.length > 0) {
			let article = articles.find(a => a.id === articleID);
			this.props.initArticle(article);
			return article;
    	} else {
    		return this.props.fetchArticle(articleID).then(spaceArticle => {
				this.props.initSpace(spaceArticle.space);
				this.props.initArticle(spaceArticle.article);
          		return spaceArticle.article;
    		}).catch(err => {
        		LOG_ENABLED && log('Error Article:_init');
    		});
   		}
    
  	}

}


const mapStateToProps = state => ({
	spaceNode: getSpace(state),
	articleNode: getArticle(state),
});


export default withRouter(connect(
	mapStateToProps,
	{ initSpace, fetchSpace, initArticle, fetchArticle }
  )(Article))
