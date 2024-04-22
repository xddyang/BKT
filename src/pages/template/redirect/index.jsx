const Main = () => {
	const token = localStorage.getItem('token');
	if (token) {
	  window.location.href = '/home';
	} else {
		window.location.href = '/login';
	}
	return null;
};

export default Main;