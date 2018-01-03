import Event from './Event';

export const smashingConf = new Event({
    imageCard: 'smashing-conf.png',
    dates: {
        start: 1497214800000,
        end: 1497387600000,
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

export const cssDay = new Event({
    imageCard: 'css-day.png',
    dates: {
        start: 1497474000000,
        end: 1497560400000,
    },
    location: 'New York, USA',
    wishListed: 56,
    title: 'CSSDay 2017',
    description:
        'CSS Day 2016 was a two-day advanced web development conference, one day about CSS, and one day about HTML. We \'ll be back.',
    tags: [
        'javascript',
        'css',
        'web',
    ],
});

export const angular = new Event({
    imageCard: 'angular-logo.png',
    dates: {
        start: 1499288400000,
        end: 1499374800000,
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

export const frontend = new Event({
    imageCard: 'front-logo.png',
    dates: {
        start: 1504126800000,
        end: 1504213200000,
    },
    location: 'Zurich, Switzerland',
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
