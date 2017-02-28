<!doctype html>
<?php
    function getAssets($path) {
      if (file_exists($path)) {
        $assets_str = file_get_contents($path);
        return json_decode($assets_str, true);
      } else {
        return array('main.js' => 'bundle.js');
      }
    }
    $assets = getAssets("./dist/manifest.json");
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Тверское ИТ-сообщество</title>
    <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <? if ($assets['main.css']) { ?>
    <link rel="stylesheet" type="text/css"  href="/<? echo $assets['main.css']?>" />
    <?}?>
</head>
<body>
  <article>
    <menu class="base-menu">
      <ul>
          <li>
              <a href="https://vk.com/tverio" target="_blank" rel='nofollow'>
                <span class="fa fa-vk"/>
              </a>
          </li>
          <li>
              <a href="https://twitter.com/tver_io" target="_blank" rel='nofollow'>
                <span class="fa fa-twitter"/>
              </a>
          </li>
          <li>
              <a href="https://github.com/tverio" target="_blank" rel='nofollow'>
                <span class="fa fa-github"/>
              </a>
          </li>
          <li>
              <a href="http://www.youtube.com/channel/UCQ5hUTc_nUdLJg65kXbKS1g" target="_blank" rel='nofollow'>
                <span class="fa fa-youtube"/>
              </a>
          </li>
      </ul>
    </menu>
    <section class="base-content">
      <h2>Regional IT community</h2>
      <h1>TVER.IO</h1>
      <a class="base-content__button" href="https://bit.ly/tverio" target="_blank" rel='nofollow'>Get my invite to slack!</a>
    </section>
  </article>
  <script src="/<? echo $assets['main.js'] ?>" ></script>
</body>
</html>
