import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Client from './client'
import Admin from './admin'

function App() {
	return (
		<Router>
			<Route path="/" component={Client} />
			<Route path="/pawhfgiowernva4hPQWURILHBW4PJHOPIERNBS4UJGPOE4HWSYJdAPHASJFOSIDJSHGIODFHGDAAPHWIRUSPGO" component={Admin} />
		</Router>
	)
}

export default App