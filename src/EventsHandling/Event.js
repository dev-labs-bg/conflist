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
