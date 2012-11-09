<?php

// Tutorial: Eine einfache Twitter-Wall im Eingenbau
// http://frank-it-beratung.com/blog/

//setlocale( "LC_ALL", "de-DE" ); // Linux

// Suche nach Hashtag...
$hashtag="kif405";
$APIurl = "http://search.twitter.com/search.json";

header('Content-Type: text/html; charset=ISO-8859-1');

// Refreh-Url mit since_id ggf aus Session laden
$param="?q=%23".$hashtag."+exclude:retweets";    

$APIurl.=$param."&include_entities=true&rpp=10&page=1";

// weitere Paramter fÃƒÂ¼r die Suche siehe
// https://dev.twitter.com/docs/using-search

// GET vorbereiten
$opts = array('http' =>
            array(
                'method'  => 'GET'
            )
        );

// mit file_get_contents versenden
$result = file_get_contents($APIurl, false, stream_context_create($opts));
$json=json_decode($result);

// since_id in Session speichern

// neue Ergebnisse seit der letzten Suche
$tweets = array();
for ($i = 0; $i < count($json->results); $i++)
{
    array_push($tweets, $json->results[$i]);
}

$play_video = true; 
//for($i = 0; $i < count($tweets); ++$i)
for($i = 0; $i < 10; ++$i)
    echo fancy_tweet_display($tweets[$i]);

function fancy_tweet_display($tweet)
{
    global $play_video;

    $media = '';
    $qrcode = '';

    if (isset($tweet->entities->media[0]->media_url)) {
        $media = "<img src='".$tweet->entities->media[0]->media_url."' />";
    }
    else
    {
        if (count($tweet->entities->urls) > 0)
        {
            $url = $tweet->entities->urls[0]->expanded_url;
            $fileending = strtolower(substr($url, strlen($url)-4, 4));
            if ($fileending == ".gif" || $fileending == "jpeg" || $fileending == ".jpg" || $fileending == ".png")
		        $media .= "<img src='".$url."' />";
            else
            {
                $s = cutstr($url, 'http://');
                $s = cutstr($s, 'www.');
                if (substr($s, 0, strlen('youtu.be/')) == 'youtu.be/')
                {
                    $s = cutstr($s, 'youtu.be/');
                    $media .= "<img src='http://img.youtube.com/vi/".$s."/mqdefault.jpg' />";
                    $play_video=false;
                }
                else
                {
                    $media = qr_code($url, 200, 200).'<br />Scanne mich!';
                }
            }
        }
    }

    $result ="<div class='tweet'><img src='".$tweet->profile_image_url;
    $result .="' align='left' width='48' height='48' hspace='5' /><div class='content'>";    
    $result .=utf8_decode($tweet->from_user_name)." (@".$tweet->from_user.")";
    $datum = $tweet->created_at;
    $datum = new DateTime($datum);
    $datum->setTimezone(new DateTimeZone('Europe/Berlin'));
    $result .="<span class='date' >".$datum->format('D H:i:s');
    $result .= "</span>";
    $result .="<div class='tweettext'>";
    $result .=utf8_decode($tweet->text)."</div></div>";

    $result .= "<center><br />".$media."</center>";

    $result .="</div>";

    return $result;
}

function cutstr($s, $p)
{
            if (substr($s, 0, strlen($p)) == $p) {
                $s = substr($s, strlen($p), strlen($s)-strlen($p));
            }
	return $s;
}

function qr_code($link, $width=150, $height=150)
{
    return '<img src="https://chart.googleapis.com/chart?cht=qr&chl='.$link.'&chs='.$width.'x'.$height.'&chld=L|0&choe=UTF-8" />';
}

?>
