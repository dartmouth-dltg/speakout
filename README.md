# Speakout
Omeka-S theme for Dartmouth College Library's SpeakOut project

## Installation

Add this to your standard themes directory in Omeka-S

## Special Instructions for Items

This theme is specific to the SpeakOut project and adds a basic grid system and UI enhancements including a specific 'rainbow' based color palette. Developed by Agile Humanites.

Items should have the following metadata values assigned

- Title
  - A name given to the resource.
  - dcterms:title
- Interviewee
  - An agent that is interviewed by another agent.
  - bibo:interviewee
- Interviewee's Dartmouth Affiliation
  - Indicates a member of a Group
  - foaf:member
- Interviewer
  - An agent that interview another agent.
  - bibo:interviewer
- Interviewer's Dartmouth Affiliation
  - Indicates the class of individuals that are a member of a Group
  - foaf:membershipClass
- Date Created
  - Date of creation of the resource.
  - dcterms:created
- Abstract
  - A summary of the resource.
  - dcterms:abstract
- Identifier
  - An unambiguous reference to the resource within a given context.
  - dcterms:identifier
- Extent
  - The size or duration of the resource.
  - dcterms:extent
- Language
  - A language of the resource.
  - dcterms:language
- Rights
  - Information about rights held in and over the resource.
  - dcterms:rights

### Preparing the HTML version of the Transcript

Any Word documents must be converted to html fragments for inclusion in the item as a related media object. The textfactory for BBEdit (v.12+)

```
bbedit-textfactory/speakout.textfactory
```

attempts to convert the text from a Word document to the expected html and should be installed in (assuming Mac O/S)

```
~/Library/Application Support/BBEdit/Text Filters
```

To convert the transcript

1. Open the transcript in Word
1. Copy and Paste the text from Word into BBEdit
1. Select "speakOut" from the Text->Apply Text Filter Menu

The expected output is of the form

```
<div class="interview">
    <div class="description">
        <p class="property" data-property="interviewee">{Name of Interviewee}</p>
        <p class="property" data-property="producer">Dartmouth College Oral History Program</p>
        <p class="property" data-property="collection">SpeakOut</p>
        <p class="property" data-property="date">{Date of Interview}</p>
        <p class="property" data-property="transcriber">{Transcription statement}</p>
    </div>

    <div class="transcription">
        <p>
            <span class="interlocutor">{NAME}</span>
            <span class="speech">{TEXT}</span>
        </p>
        <p>{Additional Text}</p>
        <p>
            <span class="interlocutor">{NAME}</span>
            <span class="speech">{TEXT}</span>
        </p>
        <p>
            <span class="interviewnote">[End of interview.]</span>
        </p>
    </div>
</div>
```

Copy and paste the html fragment into the source view of the media object and add the following metadata values to the object

```
dcterms:type -> viewable_transcript
dcterms:format -> text/html
```

### Adding the PDF version of the Transcript

Add the PDF as another media object to the item with the following metadata values

```
dcterms:type -> pdf_transcript
dcterms:format -> application/pdf
```


### Adding the Audio

Add the Audio stream as another media object to the item with the following metadata value

```
dcterms:type -> audio
```

The media is expected to be an html snippet from Kaltura player using the 'Library Audio Player' player. Example:

```
<script src="https://cdnapisec.kaltura.com/p/1985861/sp/198586100/embedIframeJs/uiconf_id/43961131/partner_id/1985861"></script>
<div id="kaltura_player_1548860237" itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" style="width: 854px; height: 50px;">&nbsp;</div>
<script>
kWidget.embed({
  "targetId": "kaltura_player_1548860237",
  "wid": "_1985861",
  "uiconf_id": 43961131,
  "flashvars": {
    "streamerType": "auto"
  },
  "cache_st": 1548860237,
  "entry_id": "1_bj0zqw8n"
});
</script>
```

In addition to the styling/customization done within Kaltura Studio, the player also loads custom css from

```
https://www.dartmouth.edu/~library/tools-external/kaltura/kaltura_audio_player.css
```

Add a thumbnail to the audio object if available. This should ideally be a square (1:1 aspect ratio) headshot of the interviewee. If a thumbnail is not assigned, a generic audio icon will be used instead. The theme also provides a pastel rainbow background to the icon.

#### Ordering of attached objects

The ordering of the HTML transcript, audio and PDF transcript are critical and should be set to

1. HTML transcript
1. Audio
1. PDF

### Home Page & Participate Page

The home page and the participate page incorporate some specific styling. The html source is expected to be of the form

```
<div class="row">
    <div class="half content-block redbg">
        <div class="row">
            <div class="centertext">
            <h2>
                <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/about">About</a>
            </h2>
            <p>
                <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/about">Learn about SpeakOut: the mission that guides it, the history behind it, and the team of Dartmouth College students, alumni, and staff that have brought it to life.</a>
            </p>
        </div>
    </div>
    </div>

    <div class="half content-block orangebg">
        <div class="row">
            <div class="centertext">
                <h2>
                    <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/interviews">Interviews</a>
                </h2>
                <p>
                    <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/interviews">Explore the stories at the heart of SpeakOut. Listen to interview audio, read full transcripts, and learn the history of Dartmouth&#39;s LGBTQIA+ community. </a>
                </p>
            </div>
        </div>
    </div>
</div>
```

Addtional row elements may be added as needed. Text is black on one of the available background colors specified by class names

```
yellowbg
orangebg
redbg
greenbg
lightbluebg
bluebg
purplebg
whitebg
```

Alternatively, each content-block can also contain a solid color square in addition to the text which will appear on a white background. In that case, the expected html is

```
<div class="row">
    <div class="half content-block">
        <div class="row">
            <div class="quarter">
                <a class="square redbg" draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/about">&nbsp;</a>
            </div>
            <div class="threequarters">
                <h2>
                    <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/about">About</a>
                </h2>
                <p>
                    <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/about">Learn about SpeakOut: the mission that guides it, the history behind it, and the team of Dartmouth College students, alumni, and staff that have brought it to life.</a>
                </p>
            </div>
        </div>
    </div>

    <div class="half content-block">
        <div class="row">
            <div class="quarter">
                <a class="square redbg" draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/about">&nbsp;</a>
            </div>        
            <div class="threequarters">
                <h2>
                    <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/interviews">Interviews</a>
                </h2>
                <p>
                    <a draggable="false" href="https://exhibits.library.dartmouth.edu/s/SpeakOut/page/interviews">Explore the stories at the heart of SpeakOut. Listen to interview audio, read full transcripts, and learn the history of Dartmouth&#39;s LGBTQIA+ community. </a>
                </p>
            </div>
        </div>
    </div>
</div>
```

At mobile breakppoints, the solid color square becomes a rectangle above the text.

#### Color sidebar and white backgrounds

The color sidebar on the side of certain pages and the white background around content is controlled by two arrays in 

```
view/omeka/site/page/
```

The arrays are
```
$nosideblock
```

which lists pages which do **not** get a randomized colored sidebar. Currently this array consists of the homepage and the participate page.

and

```
$nocontentblock
```

which lists pages which do not get a white background - only the interview pages currently.
