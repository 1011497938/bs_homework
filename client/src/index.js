import React from 'react';
import ReactDOM from 'react-dom';
// import './css/index.css';
import './component/css/WordCard.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';

// MobX


ReactDOM.render(
	<App />,
	document.getElementById('root')
);

registerServiceWorker();
