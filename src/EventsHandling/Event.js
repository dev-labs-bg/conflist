class Event {
    constructor({
        imageCard = null,
        dates = {
            start: null,
            end: null,
        },
        location = '',
        wishListed = null,
        title = '',
        description = '',
        tags = [],
    }) {
        this.imageCard = imageCard;
        this.dates = dates;
        this.location = location;
        this.wishListed = wishListed;
        this.title = title;
        this.description = description;
        this.tags = tags;
    }
}

export default Event;

// new Event({
//     imageCard: imageCard,
//     dates: {
//         start: '12th June',
//         end: '14th June',
//     },
//     location: 'New York, USA',
//     wishListed: 18,
//     title: 'SmashingConf New York 2017',
//     description:
//         'With 1 track, 2 full conference days, 10 workshops, 15 excellent speakers and just 400 available seats - tickets will go fast!',
//     tags: [
//         'javascript',
//         'css',
//         'web',
//     ]
// });
