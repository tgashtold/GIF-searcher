class MainPage extends Component {
	constructor() {
		super();
		this.mainPageHtml = `
	  <div class="searcher-wrapper">
			<label class="searcher">
				<h1 class="searcher__head">GIFs-searcher</h1>
				<input class="searcher__field" type="search">
				<button class="searcher__btn button" disabled>Search</button>
			</label>
		</div>`;
	}

	render() {
		return new Promise(resolve => {
			resolve(this.mainPageHtml);
		});
	}

	afterRender() {
		this.setActions();
	}

	setActions() {
		const searchBtn = document.getElementsByClassName('searcher__btn')[0];
		const searchTextField = document.getElementsByClassName('searcher__field')[0];
		const searchBox = document.getElementsByClassName('searcher')[0];


		searchBox.addEventListener('input', (event) => {
			const target = event.target;
			const searchTextValue = searchTextField.value;

			if (target == searchTextField) {
				searchBtn.disabled = searchTextValue.trim() 
					? false 
					: true;
			}
		});

		searchBtn.addEventListener('click', () => {
			location.hash = `#/search?q=${searchTextField.value}`;
		});
	}
}