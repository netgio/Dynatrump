dynatrumpApp.factory("moviesService", function($http){
    var _movies = [];

    var _getMovies = function(){
        $http.get("/movies")
            .then(function(results){
                //Success
                angular.copy(results.data, _movies); //this is the preferred; instead of $scope.movies = result.data
            }, function(results){
                //Error
            })
    }

    var _addNewMovie = function(movie){
        _movies.splice(_movies.length, 0, movie);
        $http.post("/movies", movie);
    }

    var _deleteMovie = function(movie){
        var pos = _movies.indexOf(movie);
        _movies.splice(pos, 1);
        $http.delete("/movies/" + pos);
    }
    
    var _rateMovie = function(movie, rating){
        // update this movie instance or find the instance in the _movies collection and update it...
    	if (!isNaN(rating)){
    		movie.rating = rating; // I know it's not the average!!
	    	movie.averageRating = (movie.averageRating+rating)/2; // I know it's not the average!!
	    	$http.put("/movies/"+ _movies.indexOf(movie), movie);
    		}
    }
    
    return{
        movies: _movies,
        getMovies: _getMovies,
        addNewMovie: _addNewMovie, 
        deleteMovie: _deleteMovie, 
        rateMovie: _rateMovie
    };
});



