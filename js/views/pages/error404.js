class Error404 extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`                
                <div class="error-box">
                    <h1 class="error-message">404 Error - Page Not Found</h1>  
                </div>`);
        });
    }
}