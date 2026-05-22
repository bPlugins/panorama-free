import './post.scss';

window.copyBPlAdminShortcode = id => {
	var input = document.querySelector('#bPlAdminShortcode-' + id + ' input');
	var tooltip = document.querySelector('#bPlAdminShortcode-' + id + ' .tooltip');
	input.select();
	input.setSelectionRange(0, 30);
	document.execCommand('copy');
	tooltip.innerHTML = 'Copied Successfully!';
	setTimeout(() => {
		tooltip.innerHTML = 'Copy To Clipboard';
	}, 1500);
}