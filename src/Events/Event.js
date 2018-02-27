class Event {
    constructor({
        _id = null,
        name = '',
        alias = '',
        shortDescription = '',
        description = '',
        pictureUrl = '',
        start = null,
        end = null,
        country = '',
        city = '',
        venue = '',
        tags = [],
        website = '',
        speakers = [],
        attendees = null,
    }) {
        this.id = _id;
        this.name = name;
        this.alias = alias;
        this.shortDescription = shortDescription;
        this.description = description;
        this.pictureUrl = pictureUrl;
        this.start = start;
        this.end = end;
        this.country = country;
        this.city = city;
        this.venue = venue;
        this.tags = tags;
        this.website = website;
        this.speakers = speakers;
        this.attendees = attendees;
    }
}

export default Event;
