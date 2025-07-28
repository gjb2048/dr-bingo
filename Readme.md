Dad Rail Sayings Bingo
======================

Web page bingo for when the given saying is said by 'Dad Rail'.

Free software
=============
Dad Rail Sayings Bingo is 'free' software under the terms of the GNU GPLv3 License, please see 'Bingo_LICENCE.txt'.

You have all the rights granted to you by the GPLv3 license.  If you are unsure about anything, then the
FAQ - http://www.gnu.org/licenses/gpl-faq.html - is a good place to look.

Please see separate licences for the Bootstrap Grid (Bootstrap_MIT_LICENSE.txt) and
Railway font (Railway_SIL_Open_Font_License.txt).

The image 'said.png' is my copyright, you are permitted to use it within the context of this web page.
Or change it for your own image - see 'Changing the image' below.

Installation
============
1. Create a folder to contain all of the files.
2. Place all of the files in that foler.
3. Open DR_Bingo.html in a web browser.


Web server installation
=======================
TODO.


Changing the sayings
====================
1. In a 'code' friendly editor such as [Notepad++](https://notepad-plus-plus.org/), edit the file 'bingo_data.js'.
2. The sayings are stored in a [JavaScript Array](https://www.w3schools.com/js/js_arrays.asp).  Edit the existing
   ones within the speech marks or add new entries to the bottom ensuring that the last entry does not have a comma
   after the closing square bracket.
3. Save.


Changing the image
==================
1. The image should be 100 by 100 pixels.  The format is up to you.  I've gone for 'png' so that I can have transparency.
2. Either overwrite 'said.png' or edit 'bingo.css' to specify your own, look for:

```
.said {
    background-image: url("said.png");
    background-position: center;
    background-repeat: no-repeat;
    color: var(--dr-secondary-colour);
}
```

3. And change the filename within the speech marks for the 'background-image' attribute.

Changing the colours
====================
1. In a 'code' friendly editor, edit the file 'bingo.css'/
2. The colours are defined in the CSS variables:

```
:root {
  --dr-main-colour: #009640;
  --dr-secondary-colour: #E30613;
}
```

attributed to the root pseudoselector. The 'main' colour controls the text and table border.
The 'secondary' colour indicates when a saying has been said / bingo condition.

Versioning
==========

[Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) is employed.


Developed and maintained by
===========================
G J Barnard MSc. BSc(Hons)(Sndw). MBCS. CEng. CITP. PGCE.

- Web profile | [About.me](https://about.me/gjbarnard)
- Website     | [Website](https://gjbarnard.co.uk)

About me
--------
I am an experienced self employed software engineer with decades of development experience in a variety of languages, design
methodologies and processes.  I have an MSc in Computing as well as a PGCE in Secondary Education.  I'm a member of the British
Computer Society with Chartered Engineer and Chartered IT Professional status.

