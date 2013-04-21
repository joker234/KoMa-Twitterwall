

function fetch_json(query_parameter, result_count)
{
    var url = "http://search.twitter.com/search.json?q=" + query_parameter; 
    var rdata = $.getJSON(url, function(data)
    {
        document.write(JSON.stringify($(data.results)));
        document.write("aaa");
    });
    return parse_json(rdata);
}

function parse_json(data)
{
    return data;
}
