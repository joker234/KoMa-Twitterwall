<?php

require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => "insert here",
    'oauth_access_token_secret' => "insert here",
    'consumer_key' => "insert here",
    'consumer_secret' => "insert here"
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";
$getField = "?".$_SERVER['QUERY_STRING'];
//echo $getField;
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getField)->buildOauth($url, $requestMethod)->performRequest();

?>
