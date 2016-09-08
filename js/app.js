
(function($) {

var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=dc2af4a7ae1f29430f4d8b9a274795a4"
 $.getJSON(weatherUrl,function(response){
    var weather = response.weather;
    var main =  response.main;
    var sys = response.sys;
     obj =   {
        city : response.name,
        country:sys.country,
        sky:weather[0].main,
        temperature:main.temp
        }



  var books = [obj]




  var Book = Backbone.Model.extend({
    defaults: {
     
      city: "Some title",
      country: "John Doe",
      sky: "2012",
      temperature: "JavaScript Programming"
    }
  });

  var BookView = Backbone.View.extend({
    tagName: "div",
    className: "bookContainer",
    template: $("#bookTemplate").html(),

    render: function() {
      var tmpl = _.template(this.template); //tmpl is a function that takes a JSON object and returns html

      this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
      return this;
    }
  });




  var Library = Backbone.Collection.extend({
    model: Book
  });


  var LibraryView = Backbone.View.extend({
    el: $("#books"),

    initialize: function() {
      this.collection = new Library(books);
      this.render();
    },

    render: function() {
      var that = this;
      _.each(this.collection.models, function(item) {
        that.renderBook(item);
      }, this);
    },

    renderBook: function(item) {
      var bookView = new BookView({
        model: item
      });
      this.$el.append(bookView.render().el);
    }
  });

  
 var libraryView = new LibraryView();

 });

})(jQuery);
