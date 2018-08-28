class User {
    constructor({
        _id = null,
        profileImg = '',
        name = '',
        email = '',
        twitterId = '',
        subscriptions = [],
        newsletterSubscription = false,
    }) {
        this.id = _id;
        this.profileImg = profileImg;
        this.name = name;
        this.email = email;
        this.twitterId = twitterId;
        this.subscriptions = subscriptions;
        this.newsletterSubscription = newsletterSubscription;
    }
}

export default User;
