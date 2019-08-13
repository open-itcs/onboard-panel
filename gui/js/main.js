var x = setInterval(function () {
  var currentdate = new Date();
  var time = formatNumber(currentdate.getHours()) + ':' + formatNumber(currentdate.getMinutes()) + ':' + formatNumber(currentdate.getSeconds());
  var date = formatNumber(currentdate.getDate()) + '.' + formatNumber(currentdate.getMonth() + 1) + '.' + currentdate.getFullYear();
  $('#statusbar-datetime span').html(time + ' ' + date);
}, 333);

function formatNumber(number) {
  return number < 10 ? ('0' + number) : ('' + number);
}

var gps = document.createElement("li");
gps.innerHTML = 'GPS';
gps.innerHTML = '! ! ! Prototyp / Testversion ! ! !';
$('#statusbar-services ul').append(gps);

destinations = [
  {
    id: 0,
    text: "Leerfeld",
    content: ""
  },
  {
    id: 740,
    text: "Fahrerschulung",
    content: "Fahrerschulung"
  }, {
    id: 1010,
    text: "Pendelverkehr",
    content: "Pendelverkehr"
  }, {
    id: 1096,
    text: "Schulbus",
    content: "Schulbus"
  }, {
    id: 1097,
    text: "Sonderfahrt",
    content: "Sonderfahrt"
  }, {
    id: 1098,
    text: "Schienenersatzverkehr",
    content: "Schienenersatzverkehr"
  }, {
    id: 1234,
    text: "Dienstfahrt",
    content: "Dienstfahrt"
  }, {
    id: 1235,
    text: "Einsatzwagen",
    content: "Einsatzwagen"
  }, {
    id: 1236,
    text: "Leerfahrt",
    content: "Leerfahrt"
  }, {
    id: 1267,
    text: "Werkverkehr",
    content: "Werkverkehr"
  }, {
    id: 1333,
    text: "Pause",
    content: "Pause"
  }, {
    id: 1444,
    text: "Bitte nicht einstiegen",
    content: "Bitte nicht einstiegen"
  },  {
    id: 1677,
    text: "Fahrt endet - Bitte nicht einstiegen",
    content: "Fahrt endet - Bitte nicht einstiegen"
  },
];


var backupContent = undefined;
var backupMenu = undefined;

function initHomeView() {
  backupContent = undefined;
  backupMenu = undefined;
  $('#btn-destination').off();

  $('#btn-destination').click(function() {
    backupContent = $('#secondarycontent').clone();
    backupMenu = $('#menubar').clone();
    initDestinationMenu()
  });
}

function initDestinationMenu() {
  $('#menubar button#abort').off();
  $('#secondarycontent-destinations').off();

  var abortButton = document.createElement('button');
  abortButton.id = 'abort';
  abortButton.className = 'bg-tertiary';
  abortButton.textContent = 'Abbrechen';
  $('#menubar button').remove();
  $('#menubar > div')[3].append(abortButton);

  $('#menubar button#abort').click(function() {
    $('#secondarycontent').replaceWith(backupContent);
    $('#menubar').replaceWith(backupMenu);
    initHomeView();
  });

  var destinationListContainer = document.createElement('div');
  destinationListContainer.id = 'secondarycontent-destinations';
  $('#secondarycontent div:first-child').replaceWith(destinationListContainer);
  $('#secondarycontent :not(div#secondarycontent-destinations)').remove();

  destinationListContainer = $('#secondarycontent-destinations');
  var destinationList = document.createElement('ul');
  destinations.forEach(function(element) {
    var destinationListItem = document.createElement('li');
    destinationListItem.id = element.id;
    destinationListItem.textContent = element.id + ': ' + element.text;
    destinationList.append(destinationListItem);
  });
  destinationListContainer.append(destinationList);

  var scrollUpButton = document.createElement('button');
  scrollUpButton.id = 'scrollUpButton';
  scrollUpButton.className = 'bg-tertiary';
  scrollUpButton.disabled = true;
  scrollUpButton.appendChild(document.createTextNode('\u25b2'));

  var scrollDownButton = document.createElement('button');
  scrollDownButton.id = 'scrollDownButton';
  scrollDownButton.className = 'bg-tertiary';
  scrollDownButton.appendChild(document.createTextNode('\u25bc'));

  $('#secondarycontent-destinations li').click(function() {
    var text = destinations.find(obj => obj.id === parseInt($(this).attr("id"))).content;
    $('#maincontent-displaytext span').text(text);
    $('#secondarycontent').replaceWith(backupContent);
    $('#menubar').replaceWith(backupMenu);
    initHomeView();
  });

  if (destinations.length > 8) {
    $('#menubar > div')[5].append(scrollUpButton);
    $('#menubar > div')[6].append(scrollDownButton);

    var upButton = $('#scrollUpButton');
    var downButton = $('#scrollDownButton');
    var list = $('#secondarycontent-destinations ul');

    var listHeight = (52 * 8) - 1;
    var completeHeight = 52 * destinations.length;
    var scrollHeight = completeHeight - listHeight;

    downButton.click(function() {
      var scrollSize = 52;
      var oldPosition = list[0].scrollTop;
      if (oldPosition === scrollHeight - 53) {
        scrollSize = 53;
      }
      list[0].scrollTop = list[0].scrollTop + scrollSize;
    });

    upButton.click(function() {
      var scrollSize = 52;
      var oldPosition = list[0].scrollTop;
      if (oldPosition === 53) {
        scrollSize = 53;
      }
      list[0].scrollTop = list[0].scrollTop - scrollSize;
    });

    list.scroll(function() {
      var position = $(this).scrollTop();
      if (position === 0) {
        upButton.attr('disabled', '');
      } else if (position === scrollHeight) {
        downButton.attr('disabled', '');
      } else {{
        upButton.removeAttr('disabled');
        downButton.removeAttr('disabled');
      }}
    });
  }
}

initHomeView();
