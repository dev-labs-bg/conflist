class User {
    constructor({
        _id = null,
        profileImg = '',
        name = '',
        email = '',
        twitterId = '',
    }) {
        this.id = _id;
        this.profileImg = profileImg;
        this.name = name;
        this.email = email;
        this.twitterId = twitterId;
    }
}

export default User;
