// React Hooks
import { Routes, Route } from 'react-router-dom';

// Components
import Home from './components/Home/Home';


const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={ <Home /> } />
			</Routes>
		</>
	);
};

export default App;
