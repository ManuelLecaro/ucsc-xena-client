'use strict';

import PureComponent from '../PureComponent';
var React = require('react');
var {Portal} = require('react-overlays');
require('./ZoomCrosshair.css');

class ZoomCrosshair extends PureComponent {
	state = {mousing: false, x: -1, y: -1};

	componentWillReceiveProps(nextProps) {
		if (!nextProps.frozen) {
			this.setState({mousing: false, x: -1, y: -1});
		}
	}

	onMouseMove = (ev) => {
		var x = ev.clientX;
		var xTarget = x - ev.currentTarget.getBoundingClientRect().left - 6;
		var yTarget = ev.clientY - ev.currentTarget.getBoundingClientRect().top - 6;

		if (!this.props.frozen) {
			this.setState({mousing: true, x, xTarget, y: ev.clientY, yTarget});
		}
	};

	onMouseOut = () => {
		if (!this.props.frozen) {
			this.setState({mousing: false});
		}
	};

	render() {
		let {mousing, x, xTarget, y, yTarget} = this.state,
			{onMouseMove, onMouseOut} = this,
			{frozen, children} = this.props,
			cursor = frozen ? 'default' : 'none';
		return (
			<div style={{cursor}} onMouseMove={onMouseMove} onMouseOut={onMouseOut}>
				{children}
				{mousing ? <div className='crosshair crosshairV' style={{left: x}}/> : null}
				{mousing ? <div className='crosshairTarget' style={{left: xTarget, top: yTarget}}/> : null}
				{mousing ?
					<Portal container={document.body}>
						<div className='crosshairs'>
							<span className='crosshair crosshairH' style={{top: y}}/>
						</div>
					</Portal> : null}
			</div>
		);
	}
}

module.exports = ZoomCrosshair;

