<?php

require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => "75013164-EMY1GTCzsPsLwuwBRL0Yb2W4qN4rUdUh7WkEDrcLn",
    'oauth_access_token_secret' => "4IVto5ZYWYyl53y4c6gjhi9BNbFZnlmAVbKoZv5K15hhk",
    'consumer_key' => "gedgo5q71mqCTu00iEEKlQ",
    'consumer_secret' => "6rI3R585t06HKsCFrrLquPMmUwIKoqBTsyBYtriuQE"
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";
$getField = "?".$_SERVER['QUERY_STRING'];
//echo $getField;
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getField)->buildOauth($url, $requestMethod)->performRequest();

?>
