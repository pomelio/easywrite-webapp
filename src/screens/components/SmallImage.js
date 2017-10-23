// @flow

import React from 'react';

import PropTypes from 'prop-types';

import {
	WEB_ROOT,
} from '../../Constants';

import '../../App.css';

import {log, LOG_ENABLED} from '../../Logger';

class SmallImage extends React.Component {
  constructor(props : Object) {
    super(props);
    this.state = {width:'small', error: null};
    LOG_ENABLED && log('SmallImage:constructor->props:' + JSON.stringify(props));
  }

  render() {
    let {photoID, ...others} = this.props;
    let width = this.state.width;
    let pix = 200;
    if (width === 'big') {
      pix = 800;
    }
    let url = WEB_ROOT + '/1/photo/' + photoID + '?resize=' + pix + 'X';
    return (
      <span onClick={(e) => {
        e.preventDefault();
        if (width === 'big') {
          return;
        }
        this.setState({...this.state, width: 'big'});
      }}>
        <img {...others} alt={'img'} src={url} />
      </span>
    );
  }
}

SmallImage.contextTypes = {
	match: PropTypes.func,
  dispatch: PropTypes.func,
};
export default SmallImage;
