# Web Audio Player

### Usage

#### With bower
- `` bower i web-audio-player ``
- adjust the configuration of your server in ``/src/js/config.js``
- run apllication on your page

 ```js
    var playerView = new App.Views.Player();
    $('#container').append( playerView.$el );
 ```

#### Without bower
- [Download archive] (https://github.com/maplemap/app.web-audio-player/archive/master.zip)
- unpack and upload to your host
- add rights '777' for ``/server/uploads``
- ``$ bower i``
- ``$ npm i``
- ``$ gulp build``

and than run ``index.html`` in ``test/``

#### Uploading files
Upload mp3 files to the server manually in ``server/uploads`` or with the player uploader (click to cloud icon)

#### Add tracks to playlist
Click to '+' icon and wait for the download file list. Select multiple files or select all by pressing 'choose all' 
and then click 'Add to playlist'

### Config
If you want to change id name or class prefixes of application, you can do it in such files:
 - ``/src/js/config.js``
 
 ```js
    App.Settings.playerID = 'webAudioPlayer';
    App.Settings.classPrefix = 'wap';
 ```
 
 - ``/src/css/variables.less``
 
 ```less
    @player-ID: webAudioPlayer;
    @class-prefix: wap;
 ```
