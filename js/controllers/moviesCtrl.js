dynatrumpApp.controller("MoviesCtrl", function ($scope, moviesService){
    //Executes when the controller is created
    $scope.movies = moviesService.movies;
    $scope.readOnly = true;
    $scope.max = 10;
    
    moviesService.getMovies();

    $scope.addNewMovie = function(movieName, year){
        var movie = {name: movieName , averageRating: 5, rating: 1, releaseYear: year};
        moviesService.addNewMovie(movie);
    };
    
    $scope.deleteMovie = function(movie){
        moviesService.deleteMovie(movie);
    };
    
    $scope.hoveringOver = function(movie, value) {
    	if(!isNaN(movie.rating)){
            $scope.readOnly = true;
            $scope.percent = 0;
    		}
    	else
    		{   
    		    $scope.readOnly = false;
    			$scope.percent = 100 * (value / $scope.max);	
    		}
    };

    $scope.hoveringLeave = function(movie) {
    	$scope.readOnly = true;
        $scope.percent = 0;
    	if(isNaN(movie.rating)){
    		console.log("Applying rating " + movie.newRating);
    		moviesService.rateMovie(movie, movie.newRating);
        }
      };
    
    $scope.ratingStates = [
      {stateOn: 'icon-ok-sign', stateOff: 'icon-ok-circle'},
      {stateOn: 'icon-star', stateOff: 'icon-star-empty'},
      {stateOn: 'icon-heart', stateOff: 'icon-ban-circle'},
      {stateOn: 'icon-heart'},
      {stateOff: 'icon-off'}
    ];
});



