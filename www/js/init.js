
document.addEventListener("DOMContentLoaded", function(event) { 

  var options = {
    'bgcolor': '#0da6ec',
    'fontcolor': '#fff', 

    // Parallax example – Remove comments to test it out:

    // parallax: true|false, 
    // parallaxBackgroundImage: 'http://lorempixel.com/900/600/nightlife/2/', // parallax default background image
    // parallaxBackground: '-23%', // parallax default background effect
    /* parallaxSlideElements: {
          title: -100, 
          subtitle: -300, 
          text: -500
      }, */

    'onOpened': function () {
      console.log("welcome screen opened");
    },
    'onClosed': function () {
      console.log("welcome screen closed");
    }
  };

  //var database = null;
  
  //var welcomescreen_slides = [];
    /*{
      id: 'slide0', 
      title: 'Slide 1 >', 
      picture: '<div class="tutorialicon">♥</div>',
      text: 'Welcome to this tutorial. In the <a class="tutorial-next-link" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.<br><br>Swipe to continue →'
    },
    {
      id: 'slide1',
      title: '< Slide 2 >', 
      picture: '<div class="tutorialicon">✲</div>',
      text: 'This is slide 2<br><br>Swipe to continue →'
    },
    {
      id: 'slide2',
      title: '< Slide 3 >', 
      picture: '<div class="tutorialicon">♫</div>',
      text: 'This is slide 3<br><br>Swipe to continue →'
    },
    {
      id: 'slide3',
      // title: 'NO TITLE', 
      picture: '<div class="tutorialicon">☆</div>',
      text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">previous slide</a>.<br><br><a class="tutorial-close-btn" href="#">End Tutorial</a>'
    } 
  ];*/

  Framework7.use(Framework7WelcomescreenPlugin);

  var app = new Framework7({
    root: '#app',
    name: 'welcomescreen-demo',
    id: 'de.timoernst.f7.welcomescreen',
    welcomescreen: {
      slides: [],
      options: options,
    },
    data: function () {
      return {
        db: null,
        sloka: [
          {
            id: 'slide0', 
            title: 'Slide 1 >', 
            picture: '<div class="tutorialicon">♥</div>',
            text: 'Welcome to this tutorial. In the <a class="tutorial-next-link" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.<br><br>Swipe to continue →'
          },
          {
            id: 'slide1',
            title: '< Slide 2 >', 
            picture: '<div class="tutorialicon">✲</div>',
            text: 'This is slide 2<br><br>Swipe to continue →'
          },
          {
            id: 'slide2',
            title: '< Slide 3 >', 
            picture: '<div class="tutorialicon">♫</div>',
            text: 'This is slide 3<br><br>Swipe to continue →'
          },
          {
            id: 'slide3',
            // title: 'NO TITLE', 
            picture: '<div class="tutorialicon">☆</div>',
            text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">previous slide</a>.<br><br><a class="tutorial-close-btn" href="#">End Tutorial</a>'
          } 
        ]
      }
    },
    init: true,
    initOnDeviceReady: true,
    on: {
      init: function () {
      
        function copyDatabaseFile(dbName) {

          var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
          var targetDirName = cordova.file.dataDirectory;

          return Promise.all([
            new Promise(function (resolve, reject) {
              resolveLocalFileSystemURL(sourceFileName, resolve, reject);
            }),
            new Promise(function (resolve, reject) {
              resolveLocalFileSystemURL(targetDirName, resolve, reject);
            })
          ]).then(function (files) {
            var sourceFile = files[0];
            var targetDir = files[1];
            return new Promise(function (resolve, reject) {
              targetDir.getFile(dbName, {}, resolve, reject);
            }).then(function () {
              console.log("file already copied");
            }).catch(function () {
              console.log("file doesn't exist, copying it");
              return new Promise(function (resolve, reject) {
                sourceFile.copyTo(targetDir, dbName, resolve, reject);
              }).then(function () {
                console.log("database file copied");
              });
            });
          });
        }

        // copyDatabaseFile('bg.db').then(function () {
        //   // success! :)
        //   app.data.db = window.sqlitePlugin.openDatabase({name: 'bg.db'});
        // }).catch(function (err) {
        //   // error! :(
        //   console.log(err);
        // });
      },     
    },
    methods: {
      loadSloka: function (bab) {

        app.welcomescreen.slides = app.data.sloka;
        // for (var i = 0; i < app.data.sloka.length; i++) {
        //   app.welcomescreen.slides.push(app.data.sloka[i]);
        // }
        app.dialog.alert('welcomescreen_slides size: ' + app.welcomescreen.slides.length);
        
        // var db = app.data.db;
        // db.transaction(function(transaction) {
        //   transaction.executeSql("select ayat as id, 'Sloka ' || ayat as title, indo as text from book where bab = ?;", [bab], function(ignored, res) {
        //     app.welcomescreen.slides = [];
        //     for (var i = 0; i < res.rows.length; i++) {
        //       app.welcomescreen.slides.push(res.rows.item(i));
        //     }
        //     //app.welcomescreen.slides = welcomescreen_slides;
        //     app.dialog.alert('The result: ' + res.rows.item(0).text);
        //     app.dialog.alert('welcomescreen_slides size: ' + app.welcomescreen.slides.length);
        //   });
        // }, function(error) {
        //   navigator.notification.alert('SELECT data error: ' + error.message);
        // });
      }

    }
  });

  var mainView = app.views.create('.view-main');
  
  Dom7(document).on('click', '.tutorial-close-btn', function () {
    app.welcomescreen.close();
  });

  Dom7('.tutorial-open-btn').click(function () {
    app.methods.loadSloka(1);
    app.welcomescreen.initSwiper();
    app.welcomescreen.open();
  });
  
  Dom7(document).on('click', '.tutorial-next-link', function (e) {
    app.welcomescreen.next(); 
  });
  
  Dom7(document).on('click', '.tutorial-previous-slide', function (e) {
    app.welcomescreen.previous(); 
  });

});
