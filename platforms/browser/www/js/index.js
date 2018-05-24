var options = ["Cancel","OK"];
 var result ;
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
        "Please enter store name:",
        this.askForPrompt,
        "Create Store Name",
        options
      );


    },
    askForPrompt: function(results)
    {

      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/"
                      + (currentdate.getMonth()+1)  + "/"
                      + currentdate.getFullYear() + " at "
                      + currentdate.getHours() + ":"
                      + currentdate.getMinutes() + ":"
                      + currentdate.getSeconds();

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

              var span2 = document.createElement("span");
              var txt2 = document.createTextNode(datetime);
              span2.appendChild(txt2);

              span2.setAttribute('id','dateTime2');
              var a = document.createElement('a');
              a.setAttribute('class','link');
              li.appendChild(span);

              // a.className = "link";

              li.appendChild(span2);
              a.appendChild(li);
              listItem.appendChild(a);

              var link = document.getElementsByClassName('link');
              for (var i = 0; i < link.length; i++) {
                link[i].onclick = function(){
                  var div = this.firstChild;
                  var div2 = div.firstChild;
                  var div3 = div2.firstChild;

                  // alert(div3.nodeValue);
                  window.location.href = "html/list.html";
                  var storage = window.localStorage;
                  storage.setItem('itemClicked', div3.nodeValue);
                }
              }
      }

  },
    onDeviceReady: function() {

      document.getElementById("addStoreName").addEventListener('click', this.addStoreName.bind(this), false);

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
