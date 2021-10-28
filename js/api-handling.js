// Sergio Pacheco - Monigle Coding Exercise

var currentResult;

$(document).ready(function () 
{
    // API Call & Brewery Data Gathering
    $.ajax
    ({
        url: "https://api.openbrewerydb.org/breweries?by_state=colorado",
        type: "GET",
        dataType: 'json',
        success: function(data)
        {
            result = data;
            currentResult = result;
            console.log(result);
        },
        error: function(error)
        {
            console.log(error);
        }
    })
})

// Displays Given Data in a Table
function appendData(data) 
{
    var table = document.getElementById("breweryTable");    
    table.innerHTML = "";
    var dataSet = "";
    
    dataSet += "<tr><th>Name</th><th>Brewery Type</th><th>Address</th><th>Phone</th><th>Website</th></tr>"

    $.each(data, function (key, value) 
    {
        dataSet += '<tr>';
        dataSet += '<td>';
        if (value.name != null)
        {
            dataSet += value.name;
        }
        dataSet += '</td>';

        dataSet += '<td>';
        if (value.brewery_type != null)
        {
            dataSet += value.brewery_type;
        }
        dataSet += '</td>';

        dataSet += '<td>'; 
        if(value.street != null)
        {
            dataSet += value.street + ', ';
        }
        if(value.city != null)
        {
            dataSet += value.city + ', ';
        }
        if(value.state != null)
        {
            dataSet += value.state + ' ';
        }
        if(value.postal_code != null)
        {
            dataSet += value.postal_code + ', ';
        }
        if(value.country != null)
        {
            dataSet += value.country;
        }
        dataSet += '</td>';

        dataSet += '<td>';
        if (value.phone != null)
        {
            dataSet += "<a href = 'tel:" + value.phone + "'>" + value.phone + "</a>";
        }
        dataSet += '</td>';

        dataSet += '<td>';
        if (value.website_url != null)
        {
            dataSet += "<a href = '" + value.website_url + "' target = '_blank'>" + value.website_url + "</a>";
        }
        dataSet += '</td>';
        dataSet += '</tr>';
    });

    table.innerHTML = dataSet;
}

function displayAll()
{
    currentResult = result;

    appendData(currentResult);
}

function sortByNameAsc()
{
    var table = document.getElementById('breweryTable');
    
    if(table.innerHTML != '')
    {
        result.sort(function(a, b)
        {
            if(a.name < b.name) { return -1; }
            if(a.firstname > b.firstname) { return 1; }
        });

        currentResult.sort(function(a, b)
        {
            if(a.name < b.name) { return -1; }
            if(a.firstname > b.firstname) { return 1; }
        });

        appendData(currentResult);
    }
    else
    {
        return 0;
    }
}

function sortByNameDes()
{
    var table = document.getElementById('breweryTable');
    
    if(table.innerHTML != '')
    {
        result.sort(function(a, b)
        {
            if(b.name < a.name) { return -1; }
            if(b.firstname > a.firstname) { return 1; }
        });

        currentResult.sort(function(a, b)
        {
            if(b.name < a.name) { return -1; }
            if(b.firstname > a.firstname) { return 1; }
        });
    
        appendData(currentResult);
    }
    else
    {
        return 0;
    }
}

function sortByType(type)
{
    var table = document.getElementById('breweryTable');

    if(table.innerHTML != '')
    {
        currentResult = result.filter(value => value.brewery_type == type);

        appendData(currentResult);
    }
    else
    {
        return 0;
    }
}

// Back to Top Button JS
scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() 
{
    scrollFunction()
};

function scrollFunction() 
{
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) 
    {
        scrollBtn.style.display = "block";
    } 
    else 
    {
        scrollBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() 
{
    document.body.scrollTop = 0; // Safari Compatibility
    document.documentElement.scrollTop = 0; // Chrome, Firefox, & IE Compatibility
}