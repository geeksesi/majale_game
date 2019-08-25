function offline() {
	document.getElementById('WIFILOST').className = 'WIFIANIM';
}

function online() {
	document.getElementById('WIFILOST').className = '';
}

export { offline, online };