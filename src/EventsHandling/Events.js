import Event from './Event';

const smashingConf = new Event({
    imageCard: 'smashing-conf.png',
    dates: {
        start: '12th June',
        end: '14th June',
    },
    location: 'New York, USA',
    wishListed: 18,
    title: 'SmashingConf New York 2017',
    description:
        'With 1 track, 2 full conference days, 10 workshops, 15 excellent speakers and just 400 available seats - tickets will go fast!',
    tags: [
        'javascript',
        'css',
        'web',
    ],
});

const cssDay = new Event({
    imageCard: 'css-day.png',
    dates: {
        start: '15th June',
        end: '16th June',
    },
    location: 'New York, USA',
    wishListed: 56,
    title: 'CSSDay 2017',
    description:
        'CSS Day 2016 was a two-day advanced web development conference, one day about CSS, and one day about HTML. We &#39;ll be back.',
    tags: [
        'javascript',
        'css',
        'web',
    ],
});

const angular = new Event({
    imageCard: 'angular-photo.png',
    dates: {
        start: '6th July',
        end: '7th July',
    },
    location: 'Barcelona,Spain',
    wishListed: 312,
    title: 'AngularCamp',
    description:
        'AngularCamp is a collaborative community event for all people which are interested in coming together to share their recent work.',
    tags: [
        'javascript',
        'css',
        'web',
    ],
});

const frontend = new Event({
    imageCard: 'front-logo.png',
    dates: {
        start: '31st Aug',
        end: '1st Sep',
    },
    location: 'Barcelona,Spain',
    wishListed: 89,
    title: 'Frontend Conference Zurich',
    description:
        'AngularCamp is a collaborative community event for all people which are interested in coming together to share their recent work.',
    tags: [
        'javascript',
        'css',
        'web',
    ],
});
