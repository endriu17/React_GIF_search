var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'YsebpzMsp9uIXjjDmA9FwsWToAVHfHkH';

App = React.createClass({
    
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  // 1.
        this.setState({
          loading: true  // 2.
        });
        this.getGif(searchingText)
         .then(response =>
            this.setState({  // 4
                loading: false,  // a
                gif: response,  // b
                searchingText: searchingText  // c
              })
         ).catch(error => console.error('Something went wrong', error));
        },

      
    
    getGif: function (searchingText) { // 1.
        return new Promise(
            function(resolve, reject){
                const xhr = new XMLHttpRequest();
                const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
                
                xhr.onload = function(){
                    if (xhr.status === 200){
                        const data = JSON.parse(xhr.responseText).data;
                        const gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        }
                        // callback(gif);
                        resolve(gif);
                        } else {
                            reject(new Error(this.statusText));
                        }
                    };
                xhr.onerror = function(){
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.statusText}`));
                    };
                xhr.open('GET', url);
                xhr.send();
        });
    },

    render: function () {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return ( <div style = {styles} ><h1>GIF search engine! </h1> <p> Find GIF on < a href = 'http://giphy.com' > giphy </a>. Press enter to find the next one...</p >
            <Search onSearch = {this.handleSearch} /> <
            Gif loading = {this.state.loading}  url = {this.state.gif.url}
            sourceUrl = {this.state.gif.sourceUrl}/> 
            </div>
        );
    }
});