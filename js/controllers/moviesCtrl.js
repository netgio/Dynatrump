dynatrumpApp.controller("MoviesCtrl", function ($scope, moviesService){
    //Executes when the controller is created
    $scope.movies = moviesService.movies;
    $scope.rating = 5;
    $scope.saveRatingToServer = function(rating) {
      $window.alert('Rating selected - ' + rating);
    };
    
    moviesService.getMovies();

    $scope.addNewMovie = function(movieName, year){
        var movie = {name: movieName , averageRating: 5, rating: "NR", releaseYear: year};
        moviesService.addNewMovie(movie);
    };
    
    $scope.deleteMovie = function(movie){
        moviesService.deleteMovie(movie);
    };
    
    $scope.rateMovie = function(movie, rating){
        moviesService.rateMovie(movie, rating);
    };
});



