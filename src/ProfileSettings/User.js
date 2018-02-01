class User {
    constructor({
        _id = null,
        profileImg = '',
        name = '',
        email = '',
    }) {
        this.id = _id;
        this.profileImg = profileImg;
        this.name = name;
        this.email = email;
    }
}

export default User;
