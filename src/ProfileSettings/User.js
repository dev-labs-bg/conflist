class User {
    constructor({
        _id = null,
        accessToken = '',
        profileImg = '',
        url = '',
        name = '',
        email = '',
        twitterId = null,
    }) {
        this.id = _id;
        this.accessToken = accessToken;
        this.profileImg = profileImg;
        this.url = url;
        this.name = name;
        this.email = email;
        this.twitterId = twitterId;
    }
}

export default User;
