$( document ).ready(function() {
    console.log( "ready!" );
    homePage();
    $('#navigation-home').click($.proxy(onNavigationHomeClick, this));
    $('#navigation-manufacturer').click($.proxy(onNavigationManufacturerClick, this));
    $('#navigation-car').click($.proxy(onNavigationCarClick, this));


});
function homePage() {
// <div class="title">Welcome here</div>
//     <div class="manufacturer-ct">
//         <img src="images/manufacturer.jpg">
//         <!--http://www.theaiatrust.com/wp-content/uploads/2016/01/02-manufacturer-provided-information.jpg-->
// <div>
//     <table id="manufacturers">
//         <tr>
//         <th>Name</th>
//         <th>Country</th>
//         <th>Founded</th>
//         </tr>
//         </table>
//         </div>
//         </div>
//         <div class="car-ct">
//         <div>
//         <table id="cars">
//         <tr>
//         <th>Name</th>
//         <th>Consumption</th>
//         <th>Color</th>
//         <th>Manufacturer</th>
//         <th>Available</th>
//         <th>Year</th>
//         <th>Horsepower</th>
//         </tr>
//         </table>
//         </div>
//         <img src="images/cars.jpg">
//         <!--https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Cars_2006.jpg/220px-Cars_2006.jpg-->
//     <!--<div class="sponsore">-->
// <!--<div class="sub-title">Sponsored by</div>-->
//     <!--<ul>-->
//     <!--<li>Webstorm</li>-->
//     <!--<li>Github</li>-->
//     <!--<li>Coffee</li>-->
//     <!--</ul>-->
//     <!--<ol>-->
//     <!--<li>blala</li>-->
//     <!--<li>Tea</li>-->
//     <!--</ol>-->
//     <!--</div>-->
//     </div>
    packManufacturers();
    packCars();
}
function packManufacturers() {
    var tableHeadName = $('<th/>').html('Name');
    var tableHeadCountry = $('<th/>').html('Country');
    var tableHeadFounded = $('<th/>').html('Founded');
    var tableHeadCt = $('<tr/>');
    var manufactTable = $('<table/>').attr('id','manufacturers');

    tableHeadCt.append(tableHeadName).append(tableHeadCountry).append(tableHeadFounded);
    manufactTable.append(tableHeadCt);
    getManufacturers();

    var manufactImg = $('<img/>').attr('src','images/manufacturer.jpg');
    var manufactCt = $('<div/>').addClass('manufacturer-ct');

    manufactCt.append(manufactImg).append(manufactTable);

    $('#content-ct').append(manufactCt);

}
function getManufacturers() {
    var request = {
        method: 'GET',
        url: '/manufacturers'
    };
    $.ajax(request).done(function (response) {
        for (var i  = 0; i < response.length; i++) {
            var tableRow = $('<tr/>');
            $.each(response[i], function (key, value) {
                var tableCell = $('<td/>').html(value);
                tableRow.append(tableCell);
            });
            $('#manufacturers').append(tableRow);
        }
    }).fail(function (error) {
        console.error('Error while reading manufacturer data from server: ', error);
    });
}
function packCars() {
    var headName = $('<th/>').html('Name');
    var headConsumption = $('<th/>').html('Consumption');
    var headColor = $('<th/>').html('Color');
    var headManufact = $('<th/>').html('Manufacturer');
    var headAvailable = $('<th/>').html('Available');
    var headYear = $('<th/>').html('Year');
    var headHP = $('<th/>').html('Horsepower');
    var tableHeadCt = $('<tr/>').addClass('car-head');
    var carTable = $('<table/>').attr('id','cars');

    tableHeadCt.append(headName).append(headConsumption).append(headColor).append(headManufact).append(headAvailable).append(headYear).append(headHP);
    carTable.append(tableHeadCt);
    getCars();

    var carImg = $('<img/>').attr('src','images/cars.jpg');
    var carCt = $('<div/>').addClass('car-ct');

    carCt.append(carImg).append(carTable);

    $('#content-ct').append(carCt);

}
function getCars() {
    var request = {
        method: 'GET',
        url: '/cars'
    };
    $.ajax(request).done(function (response) {
        for (var i  = 0; i < response.length; i++) {
            var tableRow = $('<tr/>');
            $.each(response[i], function (key, value) {
                var tableCell = $('<td/>');
                if (key == 'color') {
                    tableCell.css('background-color', value.toLowerCase()).addClass('color');
                    var colorTooltip = $('<span/>').addClass('tooltip').html(value.toLowerCase())
                    tableCell.append(colorTooltip);
                } else {
                    tableCell.html(value);
                }
                tableRow.append(tableCell);
            });
            $('#cars').append(tableRow);
        }
    }).fail(function (error) {
        console.error('Error while reading manufacturer data from server: ', error);
    });
}

function onNavigationHomeClick() {
    console.log('Home click');
}
function onNavigationManufacturerClick() {
    console.log('Manufact click');
}
function onNavigationCarClick() {
    console.log('Car click');
}