$( document ).ready(function() {
    console.log( "ready!" );
    homePage();
    $('#navigation-home').click($.proxy(homePage, this));
    $('#navigation-manufacturer').click($.proxy(addManufacturerPage, this));
    $('#navigation-car').click($.proxy(addCarPage, this));


});
function homePage() {
    $('#content-ct').empty();
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

    var manufactTitle = $('<div/>').append($('<h2/>').html('Manufacturers'));
    var manufactImg = $('<img/>').attr('src','images/manufacturer.jpg').addClass('manufact-img');
    var macufactCarsCt = $('<div/>').addClass('manufacturer-cars-ct')
    var manufactCt = $('<div/>').addClass('manufacturer-ct');

    manufactCt.append(manufactTitle).append(manufactImg).append(manufactTable).append(macufactCarsCt);

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
                if(key == 'name') {
                    tableCell.click($.proxy(showCarsForManufacturer, this, value));
                }
                tableRow.append(tableCell);
            });
            $('#manufacturers').append(tableRow);
        }
    }).fail(function (error) {
        console.error('Error while reading manufacturer data from server: ', error);
    });
}
function showCarsForManufacturer(manufacturer) {
    console.log(manufacturer);
    document.cookie="name=" + manufacturer;
    var request = {
        method: 'GET',
        url: '/manufacturer'
    };
    $.ajax(request).done(function (response) {
        console.log(response);
        $('.manufacturer-cars-ct').empty();
        var clearButton = $('<button/>').html('X');
        clearButton.click($.proxy(clearManufacturerCars));
        $('.manufacturer-cars-ct').append(clearButton);
        createCarTable(response, 'manufacturer-cars-ct')
    }).fail(function (error) {
        console.error('Error while getting cars of ', manufacturer, '. Error: ', error);
    })
}
function clearManufacturerCars() {
    $('.manufacturer-cars-ct').empty();
}

function packCars() {
    getCars();

    var carTitle = $('<div/>').append($('<h2/>').html('Cars'));
    var carImg = $('<img/>').attr('src','images/cars.jpg').addClass('car-img');
    var carCt = $('<div/>').addClass('car-ct');

    carCt.append(carTitle).append(carImg);

    $('#content-ct').append(carCt);

}
function getCars() {
    var request = {
        method: 'GET',
        url: '/cars'
    };
    $.ajax(request).done(function (response) {
        createCarTable(response, 'car-ct')
    }).fail(function (error) {
        console.error('Error while reading manufacturer data from server: ', error);
    });
}
function createCarTable(cars, containerClass) {
    var headName = $('<th/>').html('Name');
    var headManufact = $('<th/>').html('Manufacturer');
    var headConsumption = $('<th/>').html('Consumption');
    var headColor = $('<th/>').html('Color');
    var headAvailable = $('<th/>').html('Available');
    var headYear = $('<th/>').html('Year');
    var headHP = $('<th/>').html('Horsepower');
    var tableHeadCt = $('<tr/>').addClass('car-head');
    var table = $('<table/>').attr('id','cars');
    tableHeadCt.append(headName).append(headManufact).append(headConsumption).append(headColor).append(headAvailable).append(headYear).append(headHP);
    table.append(tableHeadCt);

    $.each(cars, function (key, value) {
        var row = $('<tr/>');
        var nameCell = $('<td/>').html(value.name);
        var consumptionCell = $('<td>' + value.consumption + '</td>');
        var colorCell = $('<td/>').css('background-color', value.color.toLowerCase()).addClass('color');
        var colorTooltip = $('<span/>').addClass('tooltip').html(value.color.toLowerCase())
        colorCell.append(colorTooltip);
        var manufacturerCell = $('<td/>').html(value.manufacturer);
        var availableCell = $('<td/>').html(value.available);
        var yearCell = $('<td/>').html(value.year);
        var horsepowerCell = $('<td/>').html(value.horsepower);

        row.append(nameCell, consumptionCell, colorCell, manufacturerCell,
            availableCell, yearCell, horsepowerCell);
        table.append(row);
    });
    $('.'+containerClass).append(table);


}

function addManufacturerPage() {
    $('#content-ct').empty();

    var manufactTitle = $('<h2/>').html('Add new manufacturer');
    var manufactTitleCt = $('<div/>');

    manufactTitleCt.append(manufactTitle);

    var manufactFormCt = $('<div/>').attr('id','add-manufact-ct');
    manufactFormCt.append(addManufacturerForm());

    $('#content-ct').append(manufactTitleCt).append(manufactFormCt);
}
function addManufacturerForm() {
    var nameTitle = $('<td>').html('Name');
    var nameInput = $('<input/>').attr('type', 'text').attr('name','name').attr('required','required');
    var nameInputCt = $('<td/>');
    var nameCt = $('<tr/>');
    nameInputCt.append(nameInput);
    nameCt.append(nameTitle).append(nameInputCt);

    var countryTitle = $('<td>').html('Country');
    var countries = ['Austria','Azerbaijan','Belgium','Brazil','Bulgaria','Czech','France','Germany','Japan','Korea','Mexico','Nigeria','USA','Turkey']
    var countryInput = $('<select/>').attr('required', 'required').attr('name','country');
    var countryInputCt = $('<td/>');
    var countryCt = $('<tr/>');
    for (var i = 0; i<countries.length; i++) {
        var option = $('<option/>').attr('value',countries[i]).html(countries[i]);
        countryInput.append(option);
    }
    countryInputCt.append(countryInput);
    countryCt.append(countryTitle).append(countryInputCt);

    var foundTitle = $('<td>').html('Founded');
    var foundInput = $('<input/>').attr('type', 'date').attr('name','founded').attr('required','required');;
    var foundInputCt = $('<td/>');
    var foundCt = $('<tr/>');
    foundInputCt.append(foundInput);
    foundCt.append(foundTitle).append(foundInputCt);

    var submitButton = $('<button/>').attr('type','button').addClass('submit-button').html('Add manufacturer');
    submitButton.click($.proxy(addManufacturerClick));
    var submitButtonCt = $('<td/>');
    var submitCt = $('<tr/>');
    submitButtonCt.append(submitButton);
    submitCt.append(submitButtonCt);

    var table = $('<table/>').addClass('basic-input');
    var manufactForm = $('<form/>').attr('id','add-manufact-form');

    table.append(nameCt).append(countryCt).append(foundCt).append(submitButton);
    manufactForm.append(table);
    return manufactForm;
}
function addManufacturerClick() {
    if ($('#add-manufact-form')[0].checkValidity()) {
        console.log('Add manufact call')
        var datas = {
            name: $('input[name=name]').val(),
            country: $('select[name=country]').val(),
            founded: $('input[name=founded]').val()
        };
        var request = {
            method: 'POST',
            url: '/addManufacturers',
            data: datas
        };
        $.ajax(request).done(function (response) {
            var successMessage = $('<p/>').addClass('success').html('Manufacturer added successfully.');
            $('#add-manufact-ct').append(successMessage);

        }).fail(function (error) {
            var errorMessage = $('<p/>').addClass('error');
            if (error.status == 409) {
                errorMessage.html('Manufacturer with name '+$('input[name=name]').val()+' already exist. Please use unique names.');
            } else {
                errorMessage.html('Something went wrong. Please try again later');
            }
            $('#add-manufact-ct').append(errorMessage);
        });
    } else {
        var errorMessage = $('<p/>').addClass('error').html('Please fill every form correctly.')
        $('#add-manufact-ct').append(errorMessage);
    }
}

function addCarPage() {
    $('#content-ct').empty();

    var carTitle = $('<h2/>').html('Add new car');
    var carTitleCt = $('<div/>');

    carTitleCt.append(carTitle);

    var carFormCt = $('<div/>').attr('id','add-car-ct');
    carFormCt.append(addCarForm());

    $('#content-ct').append(carTitleCt).append(carFormCt);
}
function addCarForm() {
    var nameTitle = $('<td>').html('Name');
    var nameInput = $('<input/>').attr('type', 'text').attr('name','name').attr('required','required');
    var nameInputCt = $('<td/>');
    var nameCt = $('<tr/>');
    nameInputCt.append(nameInput);
    nameCt.append(nameTitle).append(nameInputCt);

    var consumptionTitle = $('<td>').html('Consumption (liter / 100km)');
    var consumptionInput = $('<input/>').attr('type','number').attr('name','consumption').attr('required', 'required');
    var consumptionInputCt = $('<td/>');
    var consumptionCt = $('<tr/>');
    consumptionInputCt.append(consumptionInput);
    consumptionCt.append(consumptionTitle).append(consumptionInputCt);

    var colorTitle = $('<td>').html('Color');
    var colorInput = $('<input/>').attr('type', 'color').attr('name','color').attr('required','required');;
    var colorInputCt = $('<td/>');
    var colorCt = $('<tr/>');
    colorInputCt.append(colorInput);
    colorCt.append(colorTitle).append(colorInputCt);

    var manufactTitle = $('<td>').html('Manufacturer');
    var manufactInput = $('<select/>').attr('name','manufacturer').attr('id','add-car-select-manufact').attr('required', 'required');
    var manufactInputCt = $('<td/>');
    var manufactCt = $('<tr/>');
    manufactInputCt.append(manufactInput);
    manufactCt.append(manufactTitle).append(manufactInputCt);
    getManufacturerNames();

    var availableTitle = $('<td>').html('Available');
    var availableInput = $('<input/>').attr('type','number').attr('name','available').attr('required', 'required');
    var availableInputCt = $('<td/>');
    var availableCt = $('<tr/>');
    availableInputCt.append(availableInput);
    availableCt.append(availableTitle).append(availableInputCt);

    var yearTitle = $('<td>').html('Year');
    var yearInput = $('<select/>').attr('name','year').attr('required', 'required');
    var yearInputCt = $('<td/>');
    var yearCt = $('<tr/>');
    for (var i = 1900; i<2019; i++) {
        var option = $('<option/>').attr('value',i).html(i);
        yearInput.append(option);
    }
    yearInputCt.append(yearInput);
    yearCt.append(yearTitle).append(yearInputCt);

    var powerTitle = $('<td>').html('Horsepower');
    var powerInput = $('<input/>').attr('type', 'number').attr('name','power').attr('required','required');;
    var powerInputCt = $('<td/>');
    var powerCt = $('<tr/>');
    powerInputCt.append(powerInput);
    powerCt.append(powerTitle).append(powerInputCt);

    var submitButton = $('<button/>').attr('type','button').addClass('submit-button').html('Add car');
    submitButton.click($.proxy(addCarClick));
    var submitButtonCt = $('<td/>');
    var submitCt = $('<tr/>');
    submitButtonCt.append(submitButton);
    submitCt.append(submitButtonCt);

    var table = $('<table/>').addClass('basic-input');
    var manufactForm = $('<form/>').attr('id','add-car-form');

    table.append(nameCt).append(consumptionCt).append(colorCt).append(manufactCt).append(availableCt).append(yearCt).append(powerCt).append(submitButton);
    manufactForm.append(table);
    return manufactForm;
}
function getManufacturerNames() {
    var request = {
        method: 'GET',
        url: '/manufacturerNames'
    };
    $.ajax(request).done(function (respone) {
        for (var i = 0; i < respone.length; i++) {
            var option = $('<option/>').attr('value',respone[i]).html(respone[i]);
            $('#add-car-select-manufact').append(option);
        }
    }).fail(function (error) {
        console.log('Error while reading manufacturer names from server: ',error);
    })

}
function addCarClick() {
    if ($('#add-car-form')[0].checkValidity()) {
        var datas = {
            name: $('input[name=name]').val(),
            consumption: $('input[name=consumption]').val()+'l/100km',
            color: $('input[name=color]').val(),
            manufacturer: $('select[name=manufacturer]').val(),
            available: $('input[name=available]').val(),
            year: $('select[name=year]').val(),
            horsepower: $('input[name=power]').val()
        };
        var request = {
            method: 'POST',
            url: '/addCar',
            data: datas
        };
        $.ajax(request).done(function (response) {
            var successMessage = $('<p/>').addClass('success').html('Car added successfully.');
            $('#add-car-ct').append(successMessage);

        }).fail(function (error) {
            var errorMessage = $('<p/>').addClass('error');
            if (error.status == 409) {
                errorMessage.html('Car with name '+$('input[name=name]').val()+' already exist. Please use unique names.');
            } else {
                errorMessage.html('Something went wrong. Please try again later');
            }
            $('#add-car-ct').append(errorMessage);
        });
    } else {
        var errorMessage = $('<p/>').addClass('error').html('Please fill every form correctly.')
        $('#add-car-ct').append(errorMessage);
    }
}