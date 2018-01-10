class Event {
    constructor({
        id = null,
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
        atendees = null,
    }) {
        this.id = id;
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
        this.atendees = atendees;
    }
}

export default Event;
