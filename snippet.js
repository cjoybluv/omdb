


      movieGenre = "Action, Adventure, Sci-fi"

       var genreLinks = movieGenre.split(",").map(function(genre) {
            return '<a href="http://www.imdb.com/genre/'+genre.trim()+'/?ref_=tt_ov_inf" target="_blank">'+ genre.trim() +'</a>'
          });

       console.log(genreLinks);
