var options = ["Cancel","OK"];
 var result ;
 var script = document.createElement('script');

script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
var app = {

    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    addStoreName: function()
    {

      navigator.notification.prompt(
        "Please enter category name (Foods / rent / water):",
        this.askForPrompt,
        "Create Caterogy",
        options
      );


    },
    askForPrompt: function(results)
    {



        result = results.input1;
      if(result === '')
      {
        alert('Please enter again');
        this.askForPrompt;
      }else {

              var li = document.createElement("li");
              var span = document.createElement("span");
              var txt = document.createTextNode(result);
              span.appendChild(txt);


              var a = document.createElement('a');
              a.setAttribute('class','link');
              li.appendChild(span);

              // a.className = "link";

              // li.appendChild(span2);
              a.appendChild(li);
              listItem.appendChild(a);

              var link = document.getElementsByClassName('link');
              for (var i = 0; i < link.length; i++) {
                link[i].onclick = function(){
                  var div = this.firstChild;
                  var div2 = div.firstChild;
                  var div3 = div2.firstChild;

                  // alert(div3.nodeValue);
                  window.location.href = "list.html";
                  var storage = window.localStorage;
                  storage.setItem('itemClicked', div3.nodeValue);
                }
              }

              var storage = window.localStorage;
              var userID = storage.getItem('userID');

              var store = result;

              // save store Name to database (server)
              $.ajax({
                  type: "post",
                  url: "https://5931.000webhostapp.com/save_store_receipt.php",
                  data : {store, userID},
                  success: function (data, text) {

                      alert(data);


                  },
                  error: function (request, status, error) {
                      alert(request.responseText);
                  }

              });

      }

  },

    onDeviceReady: function() {
      var storage = window.localStorage;
      var userID = storage.getItem('userID');
      var i=0;
      var stores = new Array();
      $.ajax({
          type: "post",
          url: "https://5931.000webhostapp.com/get_store_receipt.php",
          dataType:"json",
          data : {userID},
          success: function (data, text) {
            stores = data;
            // alert(stores[2]);
            for(var z=0; z<stores.length;z++)
            {


              var li = document.createElement("li");
              var span = document.createElement("span");
              var txt = document.createTextNode(stores[z]);
              span.appendChild(txt);
              var a = document.createElement('a');
              a.setAttribute('class','link');
              li.appendChild(span);
              a.appendChild(li);
              listItem.appendChild(a);

              var link = document.getElementsByClassName('link');
              for (var i = 0; i < link.length; i++) {
                link[i].onclick = function(){
                  var div = this.firstChild;
                  var div2 = div.firstChild;
                  var div3 = div2.firstChild;
                  window.location.href = "list.html";
                  var storage = window.localStorage;
                  storage.setItem('itemClicked', div3.nodeValue);
                }
              }
            }

          },
          error: function (request, status, error) {
              alert(request.responseText);
          }

      });


      document.getElementById("addStoreName").addEventListener('click', this.addStoreName.bind(this), false);
      // document.getElementById("register").addEventListener('click',this.goToRegister.bind(this),false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.initialize();
