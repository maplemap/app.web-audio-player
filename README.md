#Web Audio Player

### Usage

first of all

``$ bower i``

``$ npm i``

``$ gulp build``

and than run ``index.html`` in ``test/`` folder

### Config
If you want to change id name or class prefix of application, you can do it in such files:
 - ``/src/js/config.js``
 
 ```js
    App.PLAYER_ID = 'webAudioPlayer';
    App.CLASS_PREFIX = 'wap';
 ```
 
 - ``/src/css/web-player.less``
 
 ```less
    @player-ID: webAudioPlayer;
    @class-prefix: wap;
 ```
